import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      athletes: { Row: Record<string, unknown> }
      coaches: { Row: Record<string, unknown> }
      messages: { Row: Record<string, unknown> }
      videos: { Row: Record<string, unknown> }
      events: { Row: Record<string, unknown> }
      colleges: { Row: Record<string, unknown> }
      notifications: { Row: Record<string, unknown> }
      recruiting_pipeline: { Row: Record<string, unknown> }
      athlete_tracker: { Row: Record<string, unknown> }
      scouting_reports: { Row: Record<string, unknown> }
    }
  }
}
