"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/favorites";
import {
    computeUnitPrice,
    getSelectionsLabel,
    getStockInfo,
    products,
    validateSelections,
    type Product,
    type SelectedPersonalization,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import VoodooDollPreview from "@/components/VoodooDollPreview";

const COLOR_SWATCHES: Record<string, string> = {
    blanco: "#FFFFFF",
    rosa: "#F4A6C9",
    morado: "#A7A6FF",
    verde: "#8BC48A",
    marron: "#8B5E3C",
    gris: "#B0AFB6",
    azul: "#5B8DEF",
    rojo: "#E24C4C",
    naranja: "#F2994A",
    blanco_negro: "#2D2D2D",
    marron_brilla: "#8B5E3C",
    morado_negro: "#2D2D2D",
    negro_rosa: "#F4A6C9",
    rojo_negro: "#E24C4C",
    rojo_azul: "#E24C4C",
    beige_marron: "#C9A78C",
};

export default function ProductDetail({ product }: { product: Product }) {
    const router = useRouter();
    const addToCart = useCart((state) => state.addToCart);
    const isFavorite = useFavorites((state) => state.isFavorite(product.id));
    const toggleFavorite = useFavorites((state) => state.toggleFavorite);

    const [selections, setSelections] = useState<SelectedPersonalization>({});
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [added, setAdded] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const images = useMemo(
        () => [product.image, ...(product.gallery ?? [])],
        [product]
    );

    useEffect(() => {
        setActiveImage(0);
    }, [product.id]);

    const unitPrice = useMemo(
        () => computeUnitPrice(product, selections),
        [product, selections]
    );

    const stockInfo = getStockInfo(product);

    const relatedProducts = useMemo(
        () =>
            products
                .filter((p) => p.category === product.category && p.id !== product.id)
                .slice(0, 4),
        [product]
    );

    const setOption = (optionId: string, value: string) => {
        setSelections((prev) => ({ ...prev, [optionId]: value }));
        setError(null);
        setAdded(false);
    };

    const handleAddToCart = () => {
        const validationError = validateSelections(product, selections);

        if (validationError) {
            setError(validationError);
            setAdded(false);
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            unitPrice,
            quantity,
            selections,
            selectionsLabel: getSelectionsLabel(product, selections),
        });

        setError(null);
        setAdded(true);
    };

    const handleBuyNow = () => {
        const validationError = validateSelections(product, selections);

        if (validationError) {
            setError(validationError);
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            unitPrice,
            quantity,
            selections,
            selectionsLabel: getSelectionsLabel(product, selections),
        });

        router.push("/checkout");
    };

    return (
        <main className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white rounded-3xl p-6 shadow-lg h-fit relative">
                    <button
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={
                            isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
                        }
                        className="absolute top-9 right-9 w-11 h-11 rounded-full bg-white shadow flex items-center justify-center text-2xl z-10 hover:scale-110 transition"
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button>

                    <div className="relative">
                        <Image
                            src={images[activeImage]}
                            alt={product.name}
                            width={800}
                            height={800}
                            className="rounded-2xl w-full"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveImage(
                                            (i) => (i - 1 + images.length) % images.length
                                        )
                                    }
                                    aria-label="Foto anterior"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-xl hover:scale-110 transition"
                                >
                                    ‹
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveImage((i) => (i + 1) % images.length)
                                    }
                                    aria-label="Foto siguiente"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-xl hover:scale-110 transition"
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="flex gap-3 mt-4 justify-center">
                            {images.map((src, index) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setActiveImage(index)}
                                    aria-label={`Ver foto ${index + 1}`}
                                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                                        index === activeImage
                                            ? "border-[#A7A6FF]"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <Image
                                        src={src}
                                        alt={`${product.name} foto ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-sm text-violet-500 font-semibold uppercase tracking-wide">
                        {product.category}
                    </p>

                    <h1 className="text-5xl font-bold mt-2">{product.name}</h1>

                    <p className="text-3xl text-violet-500 font-semibold mt-6">
                        {unitPrice.toFixed(2)} €
                    </p>

                    <p className="text-gray-600 mt-6">{product.description}</p>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                        <span>Material: {product.material}</span>
                        <span className={stockInfo.low ? "text-red-500 font-semibold" : ""}>
                            {stockInfo.label}
                        </span>
                    </div>

                    {product.personalization && product.personalization.length > 0 && (
                        <div className="mt-10 space-y-6">
                            <h2 className="text-xl font-bold">
                                Personaliza tu producto
                            </h2>

                            {product.personalization.map((option) => (
                                <div key={option.id}>
                                    <p className="font-semibold mb-2">
                                        {option.label}
                                        {option.required && (
                                            <span className="text-red-500"> *</span>
                                        )}
                                    </p>

                                    {option.type === "text" ? (
                                        <input
                                            type="text"
                                            maxLength={option.maxLength}
                                            placeholder={option.placeholder}
                                            value={selections[option.id] ?? ""}
                                            onChange={(e) =>
                                                setOption(option.id, e.target.value)
                                            }
                                            className="w-full border rounded-xl p-3"
                                        />
                                    ) : option.type === "color" ? (
                                        <>
                                            {product.id === 6 && (
                                                <VoodooDollPreview
                                                    colorValue={selections[option.id]}
                                                />
                                            )}

                                            <div className="flex flex-wrap gap-3">
                                                {option.choices.map((choice) => (
                                                    <button
                                                        key={choice.value}
                                                        type="button"
                                                        title={choice.label}
                                                        onClick={() =>
                                                            setOption(option.id, choice.value)
                                                        }
                                                        className={`w-10 h-10 rounded-full border-2 transition ${
                                                            selections[option.id] === choice.value
                                                                ? "border-[#A7A6FF] scale-110"
                                                                : "border-gray-200"
                                                        }`}
                                                        style={{
                                                            backgroundColor:
                                                                COLOR_SWATCHES[choice.value] ??
                                                                "#EEE",
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-wrap gap-3">
                                            {option.choices.map((choice) => (
                                                <button
                                                    key={choice.value}
                                                    type="button"
                                                    onClick={() =>
                                                        setOption(option.id, choice.value)
                                                    }
                                                    className={`px-5 py-2 rounded-full border font-medium transition ${
                                                        selections[option.id] === choice.value
                                                            ? "bg-[#A7A6FF] text-white border-[#A7A6FF]"
                                                            : "border-gray-300 text-gray-700 hover:border-[#A7A6FF]"
                                                    }`}
                                                >
                                                    {choice.label}
                                                    {choice.priceDelta
                                                        ? ` (+${choice.priceDelta.toFixed(2)} €)`
                                                        : ""}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 flex items-center gap-4">
                        <span className="font-semibold">Cantidad</span>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl"
                            >
                                −
                            </button>

                            <span className="text-xl font-bold w-6 text-center">
                                {quantity}
                            </span>

                            <button
                                type="button"
                                onClick={() => setQuantity((q) => q + 1)}
                                className="w-10 h-10 rounded-full bg-[#A7A6FF] hover:bg-[#8f8eff] text-white text-xl"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="mt-4 text-red-500 text-sm">{error}</p>
                    )}

                    {added && !error && (
                        <p className="mt-4 text-green-600 text-sm">
                            Añadido al carrito.
                        </p>
                    )}

                    <div className="flex flex-wrap gap-4 mt-6">
                        <button
                            onClick={handleAddToCart}
                            className="bg-[#A7A6FF] text-white px-8 py-4 rounded-full hover:bg-[#8f8eff] transition"
                        >
                            Añadir al carrito
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="border border-[#A7A6FF] text-[#A7A6FF] px-8 py-4 rounded-full hover:bg-[#F4F1FF] transition"
                        >
                            Comprar ahora
                        </button>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        También te puede interesar
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((related) => (
                            <ProductCard key={related.id} product={related} />
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
