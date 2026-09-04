import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

type CustomerRow = {
    id: string;
    name: string | null;
    email: string;
};

type OrderRow = {
    customer_id: string;
    total: number;
    created_at: string;
};

export default async function AdminClientesPage() {
    const [{ data: customers }, { data: orders }] = await Promise.all([
        supabaseAdmin
            .from("customers")
            .select("id, name, email")
            .returns<CustomerRow[]>(),
        supabaseAdmin
            .from("orders")
            .select("customer_id, total, created_at")
            .returns<OrderRow[]>(),
    ]);

    const stats = new Map<
        string,
        { orderCount: number; total: number; lastOrderAt: string }
    >();

    for (const order of orders ?? []) {
        const current = stats.get(order.customer_id);

        if (!current) {
            stats.set(order.customer_id, {
                orderCount: 1,
                total: order.total,
                lastOrderAt: order.created_at,
            });
            continue;
        }

        current.orderCount += 1;
        current.total += order.total;
        if (order.created_at > current.lastOrderAt) {
            current.lastOrderAt = order.created_at;
        }
    }

    const rows = (customers ?? [])
        .map((customer) => ({
            customer,
            stats: stats.get(customer.id) ?? {
                orderCount: 0,
                total: 0,
                lastOrderAt: null as string | null,
            },
        }))
        .sort((a, b) => {
            if (!a.stats.lastOrderAt) return 1;
            if (!b.stats.lastOrderAt) return -1;
            return b.stats.lastOrderAt.localeCompare(a.stats.lastOrderAt);
        });

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Clientes</h1>

            {rows.length === 0 ? (
                <p className="text-gray-500">Todavía no tienes clientes.</p>
            ) : (
                <div className="bg-white rounded-2xl shadow overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-sm text-gray-500">
                                <th className="px-6 py-4 font-semibold">Cliente</th>
                                <th className="px-6 py-4 font-semibold">Pedidos</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                                <th className="px-6 py-4 font-semibold">
                                    Última compra
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(({ customer, stats }) => (
                                <tr
                                    key={customer.id}
                                    className="border-b last:border-0 hover:bg-[#FCFAFF] transition"
                                >
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/admin/clientes/${customer.id}`}
                                            className="font-medium text-[#2D2D2D] hover:text-[#A7A6FF]"
                                        >
                                            {customer.name || customer.email}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">{stats.orderCount}</td>
                                    <td className="px-6 py-4">
                                        {stats.total.toFixed(2)} €
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {stats.lastOrderAt
                                            ? new Date(
                                                  stats.lastOrderAt
                                              ).toLocaleDateString("es-ES")
                                            : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
