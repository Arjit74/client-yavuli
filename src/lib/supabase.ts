// src/lib/supabase.ts
// Re-exporting the singleton client from integrations to avoid multiple GoTrueClient instances
export { supabase } from '@/integrations/supabase/client';