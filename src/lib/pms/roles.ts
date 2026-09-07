import type { User } from "@supabase/supabase-js";

/**
 * Roller Supabase Auth `app_metadata.role` alanında saklanır — yalnızca
 * service-role istemcisiyle (auth.admin.updateUserById) değiştirilebilir,
 * bu yüzden kullanıcı kendi rolünü değiştiremez. Rol ayarlanmamışsa (ör.
 * ana admin hesabı) kullanıcı "admin" kabul edilir; yalnızca "cleaner"
 * olarak işaretlenmiş hesaplar kısıtlanır.
 */
export type StaffRole = "admin" | "cleaner";

export function roleOf(user: Pick<User, "app_metadata"> | null | undefined): StaffRole {
  return user?.app_metadata?.role === "cleaner" ? "cleaner" : "admin";
}
