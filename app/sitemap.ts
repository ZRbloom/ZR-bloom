import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            changeFrequency: "weekly",
            priority: 1,
        },
    ];

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${siteUrl}/product/${product.id}`,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [...staticRoutes, ...productRoutes];
}
