"use client";

import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
    const items = useCart((state) => state.items);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

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

                    <div className="space-y-5">

                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="w-full border rounded-xl p-4"
                        />

                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full border rounded-xl p-4"
                        />

                        <input
                            type="tel"
                            placeholder="Teléfono"
                            className="w-full border rounded-xl p-4"
                        />

                        <input
                            type="text"
                            placeholder="Dirección"
                            className="w-full border rounded-xl p-4"
                        />

                        <input
                            type="text"
                            placeholder="Código postal"
                            className="w-full border rounded-xl p-4"
                        />

                        <input
                            type="text"
                            placeholder="Ciudad"
                            className="w-full border rounded-xl p-4"
                        />

                    </div>

                </div>

                {/* Resumen del pedido */}
                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Tu pedido
                    </h2>

                    <div className="space-y-5">

                        {items.map((item) => (

                            <div
                                key={item.id}
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

                                        <p className="text-gray-500 text-sm">
                                            Cantidad: {item.quantity}
                                        </p>

                                        <p className="text-violet-500 text-sm">
                                            {item.price.toFixed(2)} € / unidad
                                        </p>

                                    </div>

                                </div>

                                <p className="text-lg font-bold">
                                    {(item.price * item.quantity).toFixed(2)} €
                                </p>

                            </div>

                        ))}

                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between text-2xl font-bold">
                        <span>Total</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>

                    <button
                        className="mt-8 w-full bg-[#A7A6FF] hover:bg-[#8f8eff] text-white py-4 rounded-full text-lg font-semibold transition"
                    >
                        Pagar ahora
                    </button>

                </div>

            </div>

        </main>
    );
}
