import Hero from "@/components/ui/Hero";
import About from "@/components/ui/About";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim().toLowerCase() : "";

  const filteredProducts = query
    ? products.filter((product) =>
        product.name.toLowerCase().includes(query)
      )
    : products;

  return (
    <>
      <Hero />
      <About />

      <main className="bg-[#FCFAFF]">
        <section id="catalogo" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
          <h2 className="text-4xl font-bold text-center mb-14">
            {query ? `Resultados para "${q}"` : "Nuestros favoritos"}
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No hemos encontrado productos que coincidan con tu búsqueda.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
