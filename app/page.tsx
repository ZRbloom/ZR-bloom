import Link from "next/link";
import Hero from "@/components/ui/Hero";
import About from "@/components/ui/About";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, category } = await searchParams;
  const query = typeof q === "string" ? q.trim().toLowerCase() : "";
  const activeCategory = typeof category === "string" ? category : "";

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const filteredProducts = products.filter((product) => {
    const matchesQuery = query
      ? product.name.toLowerCase().includes(query)
      : true;
    const matchesCategory = activeCategory
      ? product.category === activeCategory
      : true;
    return matchesQuery && matchesCategory;
  });

  const categoryHref = (cat: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (cat) params.set("category", cat);
    const qs = params.toString();
    return `/${qs ? `?${qs}` : ""}#catalogo`;
  };

  return (
    <>
      <Hero />
      <About />

      <main className="bg-[#FCFAFF]">
        <section id="catalogo" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
          <h2 className="text-4xl font-bold text-center mb-8">
            {query
              ? `Resultados para "${q}"`
              : activeCategory || "Nuestros favoritos"}
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <Link
              href={categoryHref("")}
              className={`px-5 py-2 rounded-full border font-medium transition ${
                !activeCategory
                  ? "bg-[#A7A6FF] text-white border-[#A7A6FF]"
                  : "border-gray-300 text-gray-700 hover:border-[#A7A6FF]"
              }`}
            >
              Todas
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat}
                href={categoryHref(cat)}
                className={`px-5 py-2 rounded-full border font-medium transition ${
                  activeCategory === cat
                    ? "bg-[#A7A6FF] text-white border-[#A7A6FF]"
                    : "border-gray-300 text-gray-700 hover:border-[#A7A6FF]"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

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
