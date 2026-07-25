import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-zinc-800">
          {product.name}
        </h3>

        <p className="text-violet-500 font-semibold mt-2">
          {product.price.toFixed(2)} €
        </p>

        <button className="mt-5 w-full bg-[#A7A6FF] hover:bg-[#9795f7] text-white py-3 rounded-full transition">
          Comprar
        </button>
      </div>
    </div>
  );
}