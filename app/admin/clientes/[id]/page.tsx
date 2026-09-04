import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

type Customer = {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    address: string | null;
    postal_code: string | null;
    city: string | null;
};

type Order = {
    id: string;
    total: number;
    currency: string;
    created_at: string;
    fulfillment_status: string;
};

type OrderItem = {
    order_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    selections_label: string | null;
};

export default async function AdminClienteDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { data: customer } = await supabaseAdmin
        .from("customers")
        .select("id, name, email, phone, address, postal_code, city")
        .eq("id", id)
        .maybeSingle<Customer>();

    if (!customer) {
        notFound();
    }

    const { data: orders } = await supabaseAdmin
        .from("orders")
        .select("id, total, currency, created_at, fulfillment_status")
        .eq("customer_id", id)
        .order("created_at", { ascending: false })
        .returns<Order[]>();

    const orderIds = (orders ?? []).map((order) => order.id);

    const { data: items } =
        orderIds.length > 0
            ? await supabaseAdmin
                  .from("order_items")
                  .select("order_id, product_name, quantity, unit_price, selections_label")
                  .in("order_id", orderIds)
                  .returns<OrderItem[]>()
            : { data: [] as OrderItem[] };

    const itemsByOrder = new Map<string, OrderItem[]>();
    for (const item of items ?? []) {
        const list = itemsByOrder.get(item.order_id) ?? [];
        list.push(item);
        itemsByOrder.set(item.order_id, list);
    }

    const totalSpent = (orders ?? []).reduce((sum, o) => sum + o.total, 0);

    return (
        <div>
            <Link
                href="/admin/clientes"
                className="text-sm text-gray-500 hover:text-[#A7A6FF] transition"
            >
                ← Volver a clientes
            </Link>

            <h1 className="text-3xl font-bold mt-2 mb-8">
                {customer.name || customer.email}
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="font-semibold text-lg mb-4">Datos del cliente</h2>

                    <dl className="space-y-2 text-sm">
                        <div className="flex gap-2">
                            <dt className="text-gray-500 w-28">Email</dt>
                            <dd>{customer.email}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="text-gray-500 w-28">Teléfono</dt>
                            <dd>{customer.phone || "—"}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="text-gray-500 w-28">Dirección</dt>
                            <dd>{customer.address || "—"}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="text-gray-500 w-28">Ciudad</dt>
                            <dd>{customer.city || "—"}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="text-gray-500 w-28">Código postal</dt>
                            <dd>{customer.postal_code || "—"}</dd>
                        </div>
                    </dl>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="font-semibold text-lg mb-4">Resumen</h2>

                    <dl className="space-y-2 text-sm">
                        <div className="flex gap-2">
                            <dt className="text-gray-500 w-28">Pedidos</dt>
                            <dd>{orders?.length ?? 0}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="text-gray-500 w-28">Total gastado</dt>
                            <dd className="font-semibold text-[#A7A6FF]">
                                {totalSpent.toFixed(2)} €
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <h2 className="font-semibold text-lg mt-10 mb-4">
                Historial de pedidos
            </h2>

            {!orders || orders.length === 0 ? (
                <p className="text-gray-500">Este cliente no tiene pedidos.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl shadow p-6"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                <span className="text-sm text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString(
                                        "es-ES",
                                        {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )}
                                </span>
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#F4F1FF] text-[#A7A6FF]">
                                    {order.fulfillment_status}
                                </span>
                            </div>

                            <ul className="text-sm text-gray-700 space-y-1 mb-3">
                                {(itemsByOrder.get(order.id) ?? []).map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item.quantity}× {item.product_name}
                                            {item.selections_label
                                                ? ` (${item.selections_label})`
                                                : ""}{" "}
                                            — {item.unit_price.toFixed(2)} €
                                        </li>
                                    )
                                )}
                            </ul>

                            <p className="text-right font-semibold">
                                Total: {order.total.toFixed(2)} €
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
