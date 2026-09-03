import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacidadPage() {
    return (
        <LegalPage title="Política de privacidad">
            <p>
                En ZR Bloom nos tomamos en serio la protección de tus datos
                personales, de acuerdo con el Reglamento General de
                Protección de Datos (RGPD) y la Ley Orgánica de Protección de
                Datos (LOPDGDD).
            </p>

            <h2>Responsable del tratamiento</h2>
            <ul>
                <li>Responsable: [Nombre completo o razón social]</li>
                <li>NIF/CIF: [NIF/CIF]</li>
                <li>Dirección: [Dirección fiscal completa]</li>
                <li>Email: 97zairaruiz@gmail.com</li>
            </ul>

            <h2>¿Qué datos recogemos?</h2>
            <p>
                Cuando realizas una compra, recogemos: nombre, email,
                teléfono y dirección de envío. Estos datos se recogen a
                través de nuestra pasarela de pago (Stripe) durante el
                proceso de compra.
            </p>

            <h2>¿Para qué usamos tus datos?</h2>
            <ul>
                <li>Gestionar y enviar tu pedido.</li>
                <li>Enviarte el email de confirmación de compra.</li>
                <li>Atender consultas o incidencias relacionadas con tu pedido.</li>
            </ul>

            <h2>¿Con quién compartimos tus datos?</h2>
            <p>
                Tus datos de pago se procesan directamente por{" "}
                <a
                    href="https://stripe.com/es/privacy"
                    className="text-violet-500 underline"
                >
                    Stripe
                </a>
                , que actúa como encargado del tratamiento y cumple con los
                estándares de seguridad exigidos (PCI-DSS). Nosotros no
                almacenamos los datos de tu tarjeta en ningún momento.
                También usamos Supabase para almacenar de forma segura la
                información de pedidos y clientes.
            </p>

            <h2>¿Cuánto tiempo conservamos tus datos?</h2>
            <p>
                Conservamos tus datos mientras exista una relación comercial
                contigo y, posteriormente, durante los plazos legalmente
                exigidos para el cumplimiento de obligaciones fiscales y
                contables.
            </p>

            <h2>Tus derechos</h2>
            <p>
                Puedes ejercer tus derechos de acceso, rectificación,
                supresión, oposición, limitación y portabilidad escribiendo a
                97zairaruiz@gmail.com.
            </p>
        </LegalPage>
    );
}
