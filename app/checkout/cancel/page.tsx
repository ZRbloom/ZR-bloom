import Link from "next/link";

export default function CheckoutCancelPage() {
    return (
        <main className="max-w-2xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl font-bold mb-6">
                Pago cancelado
            </h1>

            <p className="text-gray-500 text-lg mb-10">
                No se ha realizado ningún cargo. Tu carrito sigue guardado
                por si quieres intentarlo de nuevo.
            </p>

            <div className="flex justify-center gap-4">
                <Link
                    href="/cart"
                    className="inline-block bg-[#A7A6FF] hover:bg-[#8f8eff] text-white py-4 px-10 rounded-full text-lg font-semibold transition"
                >
                    Volver al carrito
                </Link>

                <Link
                    href="/"
                    className="inline-block bg-gray-200 hover:bg-gray-300 py-4 px-10 rounded-full text-lg font-semibold transition"
                >
                    Ir a la tienda
                </Link>
            </div>
        </main>
    );
}
