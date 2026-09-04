import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import {
    sendOrderConfirmationEmail,
    sendNewOrderNotificationEmail,
} from "@/lib/email";
import { sendTelegramOrderNotification } from "@/lib/telegram";

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "Falta la firma." }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch {
        return NextResponse.json({ error: "Firma inválida." }, { status: 400 });
    }

    if (event.type !== "checkout.session.completed") {
        return NextResponse.json({ received: true });
    }

    const sessionId = (event.data.object as Stripe.Checkout.Session).id;

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items.data.price.product"],
    });

    const email = session.customer_details?.email;

    if (!email) {
        return NextResponse.json({ error: "Sesión sin email." }, { status: 400 });
    }

    const shippingDetails = session.collected_information?.shipping_details;

    const address = shippingDetails?.address
        ? [shippingDetails.address.line1, shippingDetails.address.line2]
              .filter(Boolean)
              .join(", ")
        : null;

    const { data: customer, error: customerError } = await supabaseAdmin
        .from("customers")
        .upsert(
            {
                email,
                name: session.customer_details?.name ?? null,
                phone: session.customer_details?.phone ?? null,
                address,
                postal_code: shippingDetails?.address?.postal_code ?? null,
                city: shippingDetails?.address?.city ?? null,
                updated_at: new Date().toISOString(),
            },
            { onConflict: "email" }
        )
        .select()
        .single();

    if (customerError || !customer) {
        console.error("Error guardando cliente:", customerError);
        return NextResponse.json(
            { error: "No se pudo guardar el cliente." },
            { status: 500 }
        );
    }

    const { data: existingOrder } = await supabaseAdmin
        .from("orders")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();

    const isNewOrder = !existingOrder;

    const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .upsert(
            {
                customer_id: customer.id,
                stripe_session_id: session.id,
                stripe_payment_intent_id:
                    typeof session.payment_intent === "string"
                        ? session.payment_intent
                        : null,
                status: "paid",
                subtotal: (session.amount_subtotal ?? 0) / 100,
                total: (session.amount_total ?? 0) / 100,
                currency: session.currency ?? "eur",
                shipping_address: shippingDetails
                    ? {
                          name: shippingDetails.name,
                          ...shippingDetails.address,
                      }
                    : null,
                shipping_phone: session.customer_details?.phone ?? null,
            },
            { onConflict: "stripe_session_id" }
        )
        .select()
        .single();

    if (orderError || !order) {
        console.error("Error guardando pedido:", orderError);
        return NextResponse.json(
            { error: "No se pudo guardar el pedido." },
            { status: 500 }
        );
    }

    const lineItems = session.line_items?.data ?? [];

    // Stripe puede reenviar el mismo evento más de una vez: borramos
    // cualquier línea previa de este pedido antes de reinsertar, para
    // que un reintento no duplique los productos.
    await supabaseAdmin.from("order_items").delete().eq("order_id", order.id);

    const items = lineItems.map((item) => {
        const product =
            item.price?.product && typeof item.price.product !== "string"
                ? item.price.product
                : null;

        const metadata =
            product && !("deleted" in product) ? product.metadata : {};

        let selections: Record<string, string> = {};
        try {
            selections = metadata?.selections
                ? JSON.parse(metadata.selections)
                : {};
        } catch {
            selections = {};
        }

        return {
            order_id: order.id,
            product_id: metadata?.product_id ? Number(metadata.product_id) : null,
            product_name:
                product && !("deleted" in product)
                    ? product.name
                    : (item.description ?? "Producto"),
            unit_price: (item.price?.unit_amount ?? 0) / 100,
            quantity: item.quantity ?? 1,
            selections,
            selections_label: item.description,
        };
    });

    if (items.length > 0) {
        const { error: itemsError } = await supabaseAdmin
            .from("order_items")
            .insert(items);

        if (itemsError) {
            console.error("Error guardando productos del pedido:", itemsError);
        }
    }

    if (isNewOrder) {
        try {
            await sendOrderConfirmationEmail({
                to: email,
                orderId: order.id,
                items: items.map((item) => ({
                    productName: item.product_name,
                    quantity: item.quantity,
                    unitPrice: item.unit_price,
                    selectionsLabel: item.selections_label,
                })),
                total: order.total,
                currency: order.currency,
                shippingAddress: shippingDetails
                    ? { name: shippingDetails.name, ...shippingDetails.address }
                    : null,
            });
        } catch (err) {
            console.error("Error enviando email de confirmación:", err);
        }

        try {
            await sendNewOrderNotificationEmail({
                orderId: order.id,
                items: items.map((item) => ({
                    productName: item.product_name,
                    quantity: item.quantity,
                    unitPrice: item.unit_price,
                    selectionsLabel: item.selections_label,
                })),
                total: order.total,
                currency: order.currency,
                customerName: customer.name,
                customerEmail: customer.email,
                customerPhone: customer.phone,
                shippingAddress: shippingDetails
                    ? { name: shippingDetails.name, ...shippingDetails.address }
                    : null,
            });
        } catch (err) {
            console.error("Error enviando notificación de nuevo pedido:", err);
        }

        try {
            await sendTelegramOrderNotification({
                orderId: order.id,
                items: items.map((item) => ({
                    productName: item.product_name,
                    quantity: item.quantity,
                    unitPrice: item.unit_price,
                    selectionsLabel: item.selections_label,
                })),
                total: order.total,
                currency: order.currency,
                customerName: customer.name,
                customerEmail: customer.email,
                customerPhone: customer.phone,
                shippingAddress: shippingDetails
                    ? { name: shippingDetails.name, ...shippingDetails.address }
                    : null,
            });
        } catch (err) {
            console.error("Error enviando notificación de Telegram:", err);
        }
    }

    return NextResponse.json({ received: true });
}
