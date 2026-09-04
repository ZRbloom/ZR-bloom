import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isAuthorized =
        !!user && ADMIN_EMAILS.includes((user.email ?? "").toLowerCase());

    if (!isAuthorized) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-[#FCFAFF]">
            <header className="border-b border-[#EADCF8] bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <span className="font-bold text-lg">
                        <span className="text-[#AD6899]">ZR</span> Bloom · Admin
                    </span>
                    <LogoutButton />
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12">{children}</div>
        </div>
    );
}
