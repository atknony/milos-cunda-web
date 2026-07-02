import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  let email: string, password: string;
  try {
    const body = await request.json();
    email = body.email;
    password = body.password;
  } catch {
    return new Response(JSON.stringify({ error: "Geçersiz istek." }), { status: 400 });
  }

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Geçersiz istek." }), { status: 400 });
  }

  const supabase = createSupabaseServerClient(request, cookies);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Kullanıcı adı/şifre ayrımı yapılmaz (enumeration önlemi)
    return new Response(JSON.stringify({ error: "E-posta veya şifre hatalı." }), { status: 401 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
