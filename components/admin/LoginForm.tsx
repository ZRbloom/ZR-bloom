"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/admin/clientes";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            setError("Email o contraseña incorrectos.");
            setLoading(false);
            return;
        }

        router.push(redirectTo);
        router.refresh();
    };

    return (
        <main className="max-w-sm mx-auto px-6 py-24">
            <h1 className="text-3xl font-bold text-center mb-8">
                Acceso administrador
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    required
                    autoFocus
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-xl p-3"
                />

                <input
                    type="password"
                    required
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-xl p-3"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#A7A6FF] hover:bg-[#8f8eff] text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </main>
    );
}
