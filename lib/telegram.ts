type OrderItemNotification = {
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

type TelegramOrderNotificationInput = {
    orderId: string;
    items: OrderItemNotification[];
    total: number;
    currency: string;
    customerName: string | null;
    customerEmail: string;
    customerPhone: string | null;
    shippingAddress: ShippingAddress;
};

function escapeHtml(text: string): string {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegramOrderNotification({
    orderId,
    items,
    total,
    currency,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
}: TelegramOrderNotificationInput) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Si no está configurado, no avisamos por Telegram (el email sigue
    // llegando igual). Así no rompemos el webhook si aún no se ha montado.
    if (!token || !chatId) return;

    const itemsText = items
        .map((item) => {
            const label = item.selectionsLabel
                ? ` (${escapeHtml(item.selectionsLabel)})`
                : "";
            return `• ${item.quantity}× ${escapeHtml(item.productName)}${label} — ${(item.unitPrice * item.quantity).toFixed(2)} ${currency.toUpperCase()}`;
        })
        .join("\n");

    const addressLine = shippingAddress
        ? [
              shippingAddress.line1,
              shippingAddress.line2,
              [shippingAddress.postal_code, shippingAddress.city]
                  .filter(Boolean)
                  .join(" "),
              shippingAddress.state,
          ]
              .filter(Boolean)
              .map((part) => escapeHtml(part as string))
              .join(", ")
        : null;

    const lines = [
        "🛒 <b>Nuevo pedido en ZR Bloom</b>",
        "",
        itemsText,
        "",
        `<b>Total:</b> ${total.toFixed(2)} ${currency.toUpperCase()}`,
        "",
        `<b>Cliente:</b> ${escapeHtml(customerName ?? "(sin nombre)")}`,
        escapeHtml(customerEmail),
    ];

    if (customerPhone) lines.push(escapeHtml(customerPhone));
    if (addressLine) lines.push("", `<b>Dirección:</b> ${addressLine}`);
    lines.push("", `Nº pedido: ${orderId}`);

    const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: lines.join("\n"),
                parse_mode: "HTML",
            }),
        }
    );

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Telegram API error ${response.status}: ${body}`);
    }
}
