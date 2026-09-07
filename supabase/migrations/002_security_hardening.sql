-- ============================================================
-- Milos Cunda PMS — Güvenlik sıkılaştırma (v2)
-- Zaten Supabase MCP ile uygulandı; bu dosya kaydı senkronize eder.
-- ============================================================

-- v_conflicts sorguyu yapan rolün RLS'ini uygulamalı, view sahibininkini değil
alter view v_conflicts set (security_invoker = true);

-- Tetikleyici fonksiyonunda search_path'i sabitle (rol-değişken search_path ile ele geçirilmeyi önler)
alter function set_updated_at() set search_path = '';
