"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import FreeShippingProgress from "@/components/FreeShippingProgress";
import { getFreeShippingProgress } from "@/lib/shipping";

export default function CheckoutPage() {
    const items = useCart((state) => state.items);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const subtotal = items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
    );

    const { qualifies: freeShipping } = getFreeShippingProgress(subtotal);

    const handlePay = async () => {
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map((item) => ({
                        id: item.id,
                        quantity: item.quantity,
                        selections: item.selections,
                    })),
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.url) {
                throw new Error(data.error ?? "No se pudo iniciar el pago.");
            }

            window.location.href = data.url;
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "No se pudo iniciar el pago."
            );
            setLoading(false);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">

            <h1 className="text-4xl font-bold mb-12">
                Finalizar compra
            </h1>

            <div className="grid lg:grid-cols-2 gap-12">

                {/* Datos de envío */}
                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Datos de envío
                    </h2>

                    <p className="text-gray-600">
                        Te pediremos tu email, teléfono y dirección de envío de
                        forma segura en el siguiente paso, gestionado por
                        Stripe.
                    </p>

                    <p className="text-gray-500 text-sm mt-4">
                        Por ahora solo enviamos a España 🇪🇸.
                    </p>

                </div>

                {/* Resumen del pedido */}
                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Tu pedido
                    </h2>

                    <div className="space-y-5">

                        {items.map((item) => (

                            <div
                                key={item.lineId}
                                className="flex items-center justify-between border-b pb-4"
                            >

                                <div className="flex items-center gap-4">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />

                                    <div>

                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>

                                        {item.selectionsLabel && (
                                            <p className="text-gray-500 text-xs">
                                                {item.selectionsLabel}
                                            </p>
                                        )}

                                        <p className="text-gray-500 text-sm">
                                            Cantidad: {item.quantity}
                                        </p>

                                        <p className="text-violet-500 text-sm">
                                            {item.unitPrice.toFixed(2)} € / unidad
                                        </p>

                                    </div>

                                </div>

                                <p className="text-lg font-bold">
                                    {(item.unitPrice * item.quantity).toFixed(2)} €
                                </p>

                            </div>

                        ))}

                    </div>

                    <hr className="my-6" />

                    <div className="space-y-2 text-gray-600 mb-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{subtotal.toFixed(2)} €</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Envío</span>
                            <span>
                                {freeShipping ? "Gratis" : "Se calcula en el pago"}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between text-2xl font-bold mb-6">
                        <span>Total</span>
                        <span>{subtotal.toFixed(2)} €</span>
                    </div>

                    <FreeShippingProgress total={subtotal} />

                    {error && (
                        <p className="mt-4 text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        onClick={handlePay}
                        disabled={loading || items.length === 0}
                        className="mt-8 w-full bg-[#A7A6FF] hover:bg-[#8f8eff] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-full text-lg font-semibold transition"
                    >
                        {loading ? "Redirigiendo a Stripe..." : "Pagar ahora"}
                    </button>

                </div>

            </div>

        </main>
    );
}
