import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZR Bloom — Impresiones 3D personalizadas",
    template: "%s · ZR Bloom",
  },
  description:
    "Llaveros, decoración, figuras y regalos personalizados impresos en 3D con mucho cariño. Envíos a toda España.",
  openGraph: {
    title: "ZR Bloom — Impresiones 3D personalizadas",
    description:
      "Llaveros, decoración, figuras y regalos personalizados impresos en 3D con mucho cariño.",
    url: siteUrl,
    siteName: "ZR Bloom",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
