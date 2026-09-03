import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Envíos y devoluciones" };

export default function EnviosYDevolucionesPage() {
    return (
        <LegalPage title="Envíos y devoluciones">
            <h2>Zona de envío</h2>
            <p>Por ahora enviamos únicamente a España.</p>

            <h2>Gastos de envío</h2>
            <ul>
                <li>Envío estándar: 4,95 €</li>
                <li>Envío gratuito en pedidos a partir de 30 €</li>
            </ul>

            <h2>Plazos de fabricación y entrega</h2>
            <p>
                Muchos de nuestros productos se fabrican bajo pedido, ya que
                son piezas impresas en 3D y personalizadas. El tiempo de
                fabricación aproximado aparece en la ficha de cada producto.
                Una vez fabricado, el envío suele tardar entre 2 y 5 días
                laborables adicionales.
            </p>

            <h2>Devoluciones</h2>
            <p>
                Los productos personalizados (color, tamaño, nombre grabado,
                etc.) no admiten devolución, salvo defecto de fabricación,
                por tratarse de artículos confeccionados a medida según el
                artículo 103.c del Real Decreto Legislativo 1/2007.
            </p>
            <p>
                Si tu pedido llega dañado o con un defecto de fabricación,
                escríbenos a 97zairaruiz@gmail.com con fotos del producto en
                un plazo máximo de 48 horas desde la recepción, y te
                ofreceremos una reposición o el reembolso correspondiente.
            </p>

            <h2>Contacto</h2>
            <p>
                Para cualquier duda sobre tu envío, escríbenos a
                97zairaruiz@gmail.com o por Instagram{" "}
                <a
                    href="https://www.instagram.com/zr_bloom/"
                    className="text-violet-500 underline"
                >
                    @zr_bloom
                </a>
                .
            </p>
        </LegalPage>
    );
}
