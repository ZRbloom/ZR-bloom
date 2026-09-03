import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Condiciones de compra" };

export default function CondicionesCompraPage() {
    return (
        <LegalPage title="Condiciones de compra">
            <p>
                Estas condiciones regulan la compra de productos a través de
                ZR Bloom, propiedad de [Nombre completo o razón social],
                NIF/CIF [NIF/CIF].
            </p>

            <h2>Productos y precios</h2>
            <p>
                Los precios mostrados incluyen el IVA aplicable. Los gastos
                de envío se muestran de forma separada antes de confirmar el
                pago. Nos reservamos el derecho de modificar los precios,
                sin que esto afecte a los pedidos ya confirmados.
            </p>

            <h2>Proceso de compra y pago</h2>
            <p>
                El pago se realiza de forma segura a través de Stripe,
                aceptando tarjeta de crédito/débito y Bizum. El pedido se
                confirma en el momento en que el pago se realiza
                correctamente, y recibirás un email de confirmación con los
                detalles.
            </p>

            <h2>Personalización de productos</h2>
            <p>
                Algunos productos permiten personalización (color, tamaño,
                nombre grabado, etc.). Al tratarse de productos confeccionados
                según las especificaciones del cliente, revisa bien los
                datos de personalización antes de completar el pago, ya que
                no podrán modificarse una vez iniciada la fabricación.
            </p>

            <h2>Derecho de desistimiento</h2>
            <p>
                De acuerdo con el artículo 103.c del Real Decreto Legislativo
                1/2007, el derecho de desistimiento de 14 días naturales{" "}
                <strong>no aplica</strong> a los productos personalizados o
                confeccionados según las especificaciones del cliente. Para
                productos sin personalizar, dispones de 14 días naturales
                desde la recepción del pedido para ejercer tu derecho de
                desistimiento, salvo que el producto haya sido usado más allá
                de la simple comprobación.
            </p>

            <p>
                Para más información sobre plazos y proceso de envío,
                consulta nuestra{" "}
                <a
                    href="/envios-y-devoluciones"
                    className="text-violet-500 underline"
                >
                    Política de envíos y devoluciones
                </a>
                .
            </p>
        </LegalPage>
    );
}
