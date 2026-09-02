import nodemailer from "nodemailer";

type OrderItemEmail = {
    productName: string;
    quantity: number;
    unitPrice: number;
    selectionsLabel?: string | null;
};

type ShippingAddress = {
    name?: string | null;
    line1?: string | null;
    line2?: string | null;
    postal_code?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
} | null;

type OrderConfirmationInput = {
    to: string;
    orderId: string;
    items: OrderItemEmail[];
    total: number;
    currency: string;
    shippingAddress: ShippingAddress;
};

function getTransporter() {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });
}

function formatAddress(address: ShippingAddress): string {
    if (!address) return "";

    const parts = [
        address.name,
        address.line1,
        address.line2,
        [address.postal_code, address.city].filter(Boolean).join(" "),
        address.state,
    ].filter(Boolean);

    return parts.join("<br>");
}

export async function sendOrderConfirmationEmail({
    to,
    orderId,
    items,
    total,
    currency,
    shippingAddress,
}: OrderConfirmationInput) {
    const itemsHtml = items
        .map(
            (item) => `
        <tr>
          <td style="padding:8px 0;">
            ${item.productName}
            ${
                item.selectionsLabel
                    ? `<br><span style="color:#888;font-size:13px;">${item.selectionsLabel}</span>`
                    : ""
            }
          </td>
          <td style="padding:8px 0;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 0;text-align:right;">${(item.unitPrice * item.quantity).toFixed(2)} ${currency.toUpperCase()}</td>
        </tr>
      `
        )
        .join("");

    const addressHtml = formatAddress(shippingAddress);

    const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h1 style="color:#AD6899;">¡Gracias por tu compra en ZR Bloom!</h1>
      <p>Hemos recibido tu pago correctamente. Aquí tienes el resumen de tu pedido:</p>

      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <thead>
          <tr style="border-bottom:2px solid #EADCF8;">
            <th style="text-align:left;padding:8px 0;">Producto</th>
            <th style="text-align:center;padding:8px 0;">Cant.</th>
            <th style="text-align:right;padding:8px 0;">Precio</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <p style="text-align:right;font-size:18px;font-weight:bold;">
        Total: ${total.toFixed(2)} ${currency.toUpperCase()}
      </p>

      ${
          addressHtml
              ? `<p><strong>Dirección de envío:</strong><br>${addressHtml}</p>`
              : ""
      }

      <p style="color:#888;font-size:13px;margin-top:30px;">
        Número de pedido: ${orderId}<br>
        Si tienes cualquier duda, escríbenos a 97zairaruiz@gmail.com o por
        Instagram <a href="https://www.instagram.com/zr_bloom/">@zr_bloom</a>.
      </p>
    </div>
  `;

    await getTransporter().sendMail({
        from: `"ZR Bloom" <${process.env.GMAIL_USER}>`,
        to,
        subject: "Confirmación de tu pedido en ZR Bloom",
        html,
    });
}
