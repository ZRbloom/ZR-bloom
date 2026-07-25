 import Header from "@/components/ui/Header";
 import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
 import Hero from "@/components/ui/Hero";
export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      <main className="min-h-screen bg-[#FCFAFF] flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-[#AD6899] text-sm uppercase tracking-[0.3em] mb-3">
            Bienvenido a
          </p>

          <h1 className="text-6xl font-bold text-[#2D2D2D] mb-4">
            ZR Bloom
          </h1>

          <p className="text-xl text-gray-600 max-w-xl mx-auto mb-8">
            Impresiones 3D únicas, hechas capa a capa con cariño.
          </p>

          <button className="bg-[#A7A6FF] hover:bg-[#9695f5] text-white font-semibold px-8 py-4 rounded-full transition">
            Comprar ahora
          </button>
                  <section className="max-w-7xl mx-auto px-6 py-24">

  <h2 className="text-4xl font-bold text-center mb-14">
    Nuestros favoritos
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))}

  </div>

</section>
        </div>

      </main>
    </>
  );
}
