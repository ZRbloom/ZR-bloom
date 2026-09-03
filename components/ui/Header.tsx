"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/favorites";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

export default function Header() {
    const items = useCart((state) => state.items);
    const favoriteIds = useFavorites((state) => state.ids);
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = query.trim();
        router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}#catalogo` : "/#catalogo");
        setSearchOpen(false);
    };

    return (
        <header className="w-full bg-[#FCFAFF] border-b border-[#EADCF8] relative">
            <div className="bg-[#A7A6FF] text-white text-sm text-center py-2 px-4 font-medium">
                🚚 Envío gratis a partir de {FREE_SHIPPING_THRESHOLD.toFixed(0)} € en pedidos nacionales
            </div>

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
                <button
                    onClick={() => {
                        setMenuOpen((open) => !open);
                        setSearchOpen(false);
                    }}
                    aria-label="Abrir menú"
                    className="text-3xl text-[#2D2D2D]"
                >
                    ☰
                </button>

                <Link href="/">
                    <h1 className="text-3xl font-bold text-[#2D2D2D]">
                        <span className="text-[#AD6899]">ZR</span> Bloom
                    </h1>
                </Link>

                <div className="flex gap-4 text-2xl">
                    <button
                        onClick={() => {
                            setSearchOpen((open) => !open);
                            setMenuOpen(false);
                        }}
                        aria-label="Buscar productos"
                    >
                        🔍
                    </button>

                    <Link href="/favoritos" className="relative">
                        🤍

                        {favoriteIds.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {favoriteIds.length}
                            </span>
                        )}
                    </Link>

                    <Link href="/cart" className="relative">
                        🛒

                        {items.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {items.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {menuOpen && (
                <nav className="border-t border-[#EADCF8] bg-white">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 text-lg font-medium text-[#2D2D2D]">
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            Inicio
                        </Link>
                        <Link href="/#catalogo" onClick={() => setMenuOpen(false)}>
                            Catálogo
                        </Link>
                        <Link href="/favoritos" onClick={() => setMenuOpen(false)}>
                            Favoritos
                        </Link>
                        <Link href="/cart" onClick={() => setMenuOpen(false)}>
                            Carrito
                        </Link>
                    </div>
                </nav>
            )}

            {searchOpen && (
                <div className="border-t border-[#EADCF8] bg-white">
                    <form
                        onSubmit={handleSearch}
                        className="max-w-7xl mx-auto px-6 py-4 flex gap-3"
                    >
                        <input
                            autoFocus
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar productos..."
                            className="flex-1 border rounded-xl px-4 py-3"
                        />

                        <button
                            type="submit"
                            className="bg-[#A7A6FF] hover:bg-[#8f8eff] text-white px-6 py-3 rounded-xl font-semibold transition"
                        >
                            Buscar
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
}
