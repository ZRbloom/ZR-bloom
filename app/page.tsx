import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      <main className="bg-[#FCFAFF]">
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
      </main>
    </>
  );
}