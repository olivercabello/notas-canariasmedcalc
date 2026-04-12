import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Este log nos ayudará a ver en la consola si las llaves están llegando
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Error: Las variables de entorno de Supabase no están cargadas.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)