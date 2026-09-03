"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import FreeShippingProgress from "@/components/FreeShippingProgress";
import { getShippingCost } from "@/lib/shipping";

export default function CartPage() {
    const items = useCart((state) => state.items);

    const increaseQuantity = useCart((state) => state.increaseQuantity);
    const decreaseQuantity = useCart((state) => state.decreaseQuantity);
    const removeFromCart = useCart((state) => state.removeFromCart);
    const clearCart = useCart((state) => state.clearCart);

    const subtotal = items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
    );

    const shippingCost = getShippingCost(subtotal);
    const total = subtotal + shippingCost;

    return (
        <main className="max-w-6xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-10">
                Mi carrito
            </h1>

            {items.length === 0 ? (
                <p className="text-gray-500 text-xl">
                    Tu carrito está vacío.
                </p>
            ) : (
                <>
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div
                                key={item.lineId}
                                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                            >
                                <div className="flex items-center gap-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-2xl flex-shrink-0"
                                    />

                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {item.name}
                                        </h2>

                                        {item.selectionsLabel && (
                                            <p className="text-gray-500 text-sm mt-1">
                                                {item.selectionsLabel}
                                            </p>
                                        )}

                                        <p className="text-violet-500 font-semibold mt-2">
                                            {item.unitPrice.toFixed(2)} €
                                        </p>

                                        <div className="flex flex-wrap items-center gap-3 mt-4">
                                            <button
                                                onClick={() => decreaseQuantity(item.lineId)}
                                                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl"
                                            >
                                                −
                                            </button>

                                            <span className="text-xl font-bold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => increaseQuantity(item.lineId)}
                                                className="w-10 h-10 rounded-full bg-[#A7A6FF] hover:bg-[#8f8eff] text-white text-xl"
                                            >
                                                +
                                            </button>

                                            <button
                                                onClick={() => removeFromCart(item.lineId)}
                                                className="sm:ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-3xl font-bold sm:text-right">
                                    {(item.unitPrice * item.quantity).toFixed(2)} €
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-wrap justify-between items-start gap-4">
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={clearCart}
                                className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl font-semibold"
                            >
                                Vaciar carrito
                            </button>

                            <Link
                                href="/#catalogo"
                                className="border border-[#A7A6FF] text-[#A7A6FF] hover:bg-[#F4F1FF] px-6 py-3 rounded-xl font-semibold transition"
                            >
                                Seguir comprando
                            </Link>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-8 w-80">
                            <h2 className="text-2xl font-bold mb-4">
                                Resumen
                            </h2>

                            <div className="space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{subtotal.toFixed(2)} €</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Envío</span>
                                    <span>
                                        {shippingCost === 0
                                            ? "Gratis"
                                            : `${shippingCost.toFixed(2)} €`}
                                    </span>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between text-2xl font-bold mb-6">
                                <span>Total</span>
                                <span>{total.toFixed(2)} €</span>
                            </div>

                            <FreeShippingProgress total={subtotal} />

                            <Link
                                href="/checkout"
                                className="mt-8 block w-full bg-[#A7A6FF] hover:bg-[#8f8eff] text-white py-4 rounded-full text-center font-semibold transition"
                            >
                                Finalizar compra
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}