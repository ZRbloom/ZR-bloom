"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartPage() {
    const items = useCart((state) => state.items);

    const increaseQuantity = useCart((state) => state.increaseQuantity);
    const decreaseQuantity = useCart((state) => state.decreaseQuantity);
    const removeFromCart = useCart((state) => state.removeFromCart);
    const clearCart = useCart((state) => state.clearCart);

    const total = items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
    );

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
                                className="bg-white rounded-3xl shadow-lg p-6 flex justify-between items-center"
                            >
                                <div className="flex items-center gap-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-28 h-28 object-cover rounded-2xl"
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

                                        <div className="flex items-center gap-3 mt-4">
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
                                                className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-3xl font-bold">
                                    {(item.unitPrice * item.quantity).toFixed(2)} €
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-between items-center">
                        <button
                            onClick={clearCart}
                            className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl font-semibold"
                        >
                            Vaciar carrito
                        </button>

                        <div className="bg-white rounded-3xl shadow-lg p-8 w-80">
                            <h2 className="text-2xl font-bold">
                                Total
                            </h2>

                            <p className="text-4xl text-violet-500 font-bold mt-3">
                                {total.toFixed(2)} €
                            </p>

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