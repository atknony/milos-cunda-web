import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";

/**
 * Oturum (auth) istemcisi — anon anahtar + çerezler.
 * Yalnızca kimlik doğrulama için kullanılır; veri erişimi admin.ts üzerinden yapılır
 * (RLS deny-all olduğu için bu istemci hiçbir satır göremez).
 */
export function createSupabaseServerClient(request: Request, cookies: AstroCookies) {
  return createServerClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "").map(
            ({ name, value }) => ({ name, value: value ?? "" })
          );
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, options);
          });
        },
      },
    }
  );
}

/** Geçerli oturumdaki kullanıcıyı döndürür; oturum yoksa null. */
export async function getSessionUser(request: Request, cookies: AstroCookies) {
  const supabase = createSupabaseServerClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
