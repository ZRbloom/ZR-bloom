import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
    computeUnitPrice,
    getSelectionsLabel,
    products,
    validateSelections,
    type SelectedPersonalization,
} from "@/lib/products";

type CartItemInput = {
    id: number;
    quantity: number;
    selections?: SelectedPersonalization;
};

export async function POST(request: NextRequest) {
    const { items } = (await request.json()) as { items: CartItemInput[] };

    if (!items || items.length === 0) {
        return NextResponse.json(
            { error: "El carrito está vacío." },
            { status: 400 }
        );
    }

    const origin = request.headers.get("origin") ?? request.nextUrl.origin;

    let line_items;

    try {
        line_items = items.map((item) => {
            const product = products.find((p) => p.id === item.id);

            if (!product) {
                throw new Error(`Producto no encontrado: ${item.id}`);
            }

            const validationError = validateSelections(product, item.selections);
            if (validationError) {
                throw new Error(validationError);
            }

            const quantity = Math.max(1, Math.floor(item.quantity));
            const unitPrice = computeUnitPrice(product, item.selections);
            const selectionsLabel = getSelectionsLabel(product, item.selections);

            return {
                quantity,
                price_data: {
                    currency: "eur",
                    unit_amount: Math.round(unitPrice * 100),
                    product_data: {
                        name: product.name,
                        description: selectionsLabel,
                        images: [`${origin}${product.image}`],
                    },
                },
            };
        });
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    err instanceof Error
                        ? err.message
                        : "No se pudo procesar el carrito.",
            },
            { status: 400 }
        );
    }

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "bizum"],
        allow_promotion_codes: true,
        shipping_address_collection: {
            allowed_countries: ["ES"],
        },
        phone_number_collection: {
            enabled: true,
        },
        line_items,
        success_url: `${origin}/checkout/success`,
        cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
}
