import type { Metadata } from "next";
import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} · ZR Bloom`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

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

  return <ProductDetail product={product} />;
}
