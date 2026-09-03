import Link from "next/link";

export default function NotFound() {
    return (
        <main className="max-w-2xl mx-auto px-6 py-24 text-center">
            <p className="uppercase tracking-[0.35em] text-[#AD6899] text-sm mb-5">
                Error 404
            </p>

            <h1 className="text-4xl font-bold mb-6">
                No hemos encontrado esta página
            </h1>

            <p className="text-gray-600 mb-10">
                Puede que el enlace esté roto o que el producto ya no esté
                disponible. Prueba a volver al catálogo.
            </p>

            <Link
                href="/#catalogo"
                className="inline-block bg-[#A7A6FF] hover:bg-[#8f8eff] text-white py-4 px-10 rounded-full text-lg font-semibold transition"
            >
                Ver catálogo
            </Link>
        </main>
    );
}
