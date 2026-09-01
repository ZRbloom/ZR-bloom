import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

type CartItemInput = {
    id: number;
    quantity: number;
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

    const line_items = items.map((item) => {
        const product = products.find((p) => p.id === item.id);

        if (!product) {
            throw new Error(`Producto no encontrado: ${item.id}`);
        }

        const quantity = Math.max(1, Math.floor(item.quantity));

        return {
            quantity,
            price_data: {
                currency: "eur",
                unit_amount: Math.round(product.price * 100),
                product_data: {
                    name: product.name,
                    images: [`${origin}${product.image}`],
                },
            },
        };
    });

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "bizum"],
        line_items,
        success_url: `${origin}/checkout/success`,
        cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
}
