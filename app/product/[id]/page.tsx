import { products } from "@/lib/products";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }
console.log(product)
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12">

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="rounded-2xl w-full"
          />
        </div>

        <div>
          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="text-3xl text-violet-500 font-semibold mt-6">
            {product.price.toFixed(2)} €
          </p>

          <p className="text-gray-600 mt-8">
            Producto impreso en 3D con materiales de alta calidad,
            diseñado con mucho cariño por ZR Bloom.
          </p>

          <button className="mt-10 bg-[#A7A6FF] text-white px-8 py-4 rounded-full hover:bg-[#8f8eff] transition">
            Comprar
          </button>
        </div>

      </div>
    </main>
  );
}