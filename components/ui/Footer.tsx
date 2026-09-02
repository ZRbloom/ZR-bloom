import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#2D2D2D] text-white mt-24">
            <div className="max-w-7xl mx-auto px-6 py-6 border-b border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/80">
                <span>🔒 Pago 100% seguro con Stripe</span>
                <span>💳 Tarjeta</span>
                <span>🅱️ Bizum</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-3 gap-10">
                <div>
                    <h3 className="text-2xl font-bold">
                        <span className="text-[#AD6899]">ZR</span> Bloom
                    </h3>
                    <p className="text-white/60 mt-3 text-sm">
                        Impresiones 3D hechas con mucho cariño: llaveros,
                        decoración y regalos personalizados.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Tienda</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                        <li>
                            <Link href="/" className="hover:text-white transition">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/#catalogo" className="hover:text-white transition">
                                Catálogo
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart" className="hover:text-white transition">
                                Carrito
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Contacto</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                        <li>
                            <a
                                href="mailto:hola@zrbloom.es"
                                className="hover:text-white transition"
                            >
                                hola@zrbloom.es
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition">
                                Instagram @zrbloom
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6 border-t border-white/10 text-center text-white/50 text-xs">
                © {new Date().getFullYear()} ZR Bloom. Todos los derechos reservados.
            </div>
        </footer>
    );
}
