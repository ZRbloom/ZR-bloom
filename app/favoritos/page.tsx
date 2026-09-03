"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function FavoritosPage() {
    const ids = useFavorites((state) => state.ids);
    const favoriteProducts = products.filter((product) => ids.includes(product.id));

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-10">Mis favoritos</h1>

            {favoriteProducts.length === 0 ? (
                <div>
                    <p className="text-gray-500 text-xl mb-6">
                        Todavía no has guardado ningún producto.
                    </p>

                    <Link
                        href="/#catalogo"
                        className="inline-block bg-[#A7A6FF] hover:bg-[#8f8eff] text-white py-4 px-10 rounded-full font-semibold transition"
                    >
                        Ver catálogo
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {favoriteProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
}
