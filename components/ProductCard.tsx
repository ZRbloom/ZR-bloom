"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getStockInfo, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCart((state) => state.addToCart);

  const needsPersonalization = product.personalization?.some(
    (option) => option.required
  );

  const stockInfo = getStockInfo(product);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative">
        {stockInfo.low && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            {stockInfo.label}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover"
        />

        <div className="p-5">
          <h3 className="text-xl font-bold text-zinc-800">
            {product.name}
          </h3>

          <p className="text-violet-500 font-semibold mt-2">
            {product.price.toFixed(2)} €
          </p>

          {needsPersonalization ? (
            <span className="mt-5 block w-full text-center bg-[#F4F1FF] text-[#8f8eff] py-3 rounded-full font-semibold">
              Personalizar
            </span>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                });
              }}
              className="mt-5 w-full bg-[#A7A6FF] hover:bg-[#9795f7] text-white py-3 rounded-full transition"
            >
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}