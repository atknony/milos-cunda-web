import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";

/**
 * Kalıcı oturum: admin girişten sonra oturum çerezi 1 yıl geçerli kalır ve her
 * `getUser()` çağrısında (middleware, her /api isteği) refresh token ile
 * sessizce yenilenir — bu yüzden oturum pratikte hiç sona ermez. Yalnızca
 * "Çıkış" (logout.ts → signOut()) oturumu sonlandırır. Not: Supabase projesinde
 * Authentication → Sessions altında bir "time-box" / inactivity timeout
 * ayarlanmışsa o, bu davranışı geçersiz kılar — panelde tek admin kullanıcısı
 * olduğundan projede böyle bir sınır ayarlanmamalıdır.
 */
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 yıl

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
      cookieOptions: {
        maxAge: SESSION_COOKIE_MAX_AGE,
      },
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "").map(
            ({ name, value }) => ({ name, value: value ?? "" })
          );
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, { ...options, maxAge: SESSION_COOKIE_MAX_AGE });
          });
        },
      },
    }
  );
}

/** Geçerli oturumdaki kullanıcıyı döndürür; oturum yoksa null. Süresi dolan erişim
 * jetonunu refresh token ile sessizce yeniler (bkz. yukarıdaki kalıcı oturum notu). */
export async function getSessionUser(request: Request, cookies: AstroCookies) {
  const supabase = createSupabaseServerClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
