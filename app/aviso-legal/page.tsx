import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Aviso legal" };

export default function AvisoLegalPage() {
    return (
        <LegalPage title="Aviso legal">
            <p>
                En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad
                de la Información y Comercio Electrónico (LSSI-CE), se
                informa de los siguientes datos del titular de este sitio
                web:
            </p>

            <ul>
                <li>Titular: [Nombre completo o razón social]</li>
                <li>NIF/CIF: [NIF/CIF]</li>
                <li>Dirección: [Dirección fiscal completa]</li>
                <li>Email de contacto: 97zairaruiz@gmail.com</li>
            </ul>

            <h2>Objeto</h2>
            <p>
                ZR Bloom (en adelante, &quot;el sitio web&quot;) tiene por
                objeto la venta online de productos de impresión 3D
                personalizados, hechos a mano.
            </p>

            <h2>Condiciones de uso</h2>
            <p>
                El acceso y uso de este sitio web atribuye la condición de
                usuario y supone la aceptación de las condiciones incluidas
                en este Aviso Legal. El usuario se compromete a hacer un uso
                adecuado de los contenidos y servicios que se ofrecen.
            </p>

            <h2>Propiedad intelectual</h2>
            <p>
                Todos los contenidos del sitio web (textos, fotografías,
                diseños, logotipos) son propiedad de [Nombre completo o razón
                social] o cuentan con la correspondiente autorización para su
                uso, y están protegidos por la normativa de propiedad
                intelectual e industrial.
            </p>

            <h2>Legislación aplicable</h2>
            <p>
                Las presentes condiciones se rigen por la legislación
                española. Para cualquier controversia serán competentes los
                juzgados y tribunales que correspondan según la normativa de
                consumidores y usuarios aplicable.
            </p>
        </LegalPage>
    );
}
