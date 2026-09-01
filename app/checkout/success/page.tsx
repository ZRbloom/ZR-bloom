"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CheckoutSuccessPage() {
    const clearCart = useCart((state) => state.clearCart);

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <main className="max-w-2xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl font-bold mb-6">
                ¡Gracias por tu compra!
            </h1>

            <p className="text-gray-500 text-lg mb-10">
                Hemos recibido tu pago correctamente. Te enviaremos un correo
                con los detalles del pedido.
            </p>

            <Link
                href="/"
                className="inline-block bg-[#A7A6FF] hover:bg-[#8f8eff] text-white py-4 px-10 rounded-full text-lg font-semibold transition"
            >
                Volver a la tienda
            </Link>
        </main>
    );
}
