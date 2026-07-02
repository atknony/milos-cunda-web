import { createClient } from "@supabase/supabase-js";

/**
 * Service-role istemcisi — TÜM veri erişimi buradan yapılır.
 * RLS'yi atlar; bu yüzden yalnızca oturum doğrulaması yapılmış
 * sunucu rotalarında kullanılmalıdır. Tarayıcıya asla sızmamalıdır.
 */
export function createSupabaseAdminClient() {
  return createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );
}
