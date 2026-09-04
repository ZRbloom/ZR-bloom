import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // No usar getSession() aquí: getUser() revalida el token contra Supabase
    // en vez de fiarse solo de la cookie, así una cookie falsificada no cuela.
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isAuthorized =
        !!user && ADMIN_EMAILS.includes((user.email ?? "").toLowerCase());

    if (!isAuthorized) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("redirectTo", request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
