import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Política de cookies" };

export default function CookiesPage() {
    return (
        <LegalPage title="Política de cookies">
            <p>
                Este sitio web utiliza cookies propias y de terceros para
                mejorar tu experiencia de compra.
            </p>

            <h2>¿Qué es una cookie?</h2>
            <p>
                Una cookie es un pequeño archivo que se guarda en tu
                navegador al visitar una web, y que permite recordar
                información sobre tu visita.
            </p>

            <h2>Cookies que utilizamos</h2>
            <ul>
                <li>
                    <strong>Carrito de compra:</strong> guardamos el contenido
                    de tu carrito en tu navegador (localStorage) para que no
                    se pierda si recargas la página. No es una cookie de
                    rastreo, no sale de tu dispositivo.
                </li>
                <li>
                    <strong>Stripe:</strong> durante el proceso de pago,
                    Stripe puede utilizar cookies propias necesarias para
                    procesar el pago de forma segura y prevenir fraude.
                </li>
            </ul>

            <p>
                Actualmente no utilizamos cookies de analítica ni de
                publicidad. Si en el futuro incorporamos herramientas como
                Google Analytics, actualizaremos esta página y te pediremos
                tu consentimiento antes de activarlas.
            </p>

            <h2>¿Cómo puedo gestionar las cookies?</h2>
            <p>
                Puedes eliminar o bloquear las cookies desde la
                configuración de tu navegador. Ten en cuenta que bloquear el
                almacenamiento local puede afectar al funcionamiento del
                carrito de compra.
            </p>
        </LegalPage>
    );
}
