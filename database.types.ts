export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          age: string | null
          city: string | null
          created_at: string | null
          cv_url: string | null
          email: string | null
          english_level: string | null
          first_name: string | null
          github: string | null
          id: number
          is_recommended: boolean | null
          last_name: string | null
          phone_number: string | null
          score: number | null
          skills: string | null
          status: string | null
          website: string | null
        }
        Insert: {
          age?: string | null
          city?: string | null
          created_at?: string | null
          cv_url?: string | null
          email?: string | null
          english_level?: string | null
          first_name?: string | null
          github?: string | null
          id?: number
          is_recommended?: boolean | null
          last_name?: string | null
          phone_number?: string | null
          score?: number | null
          skills?: string | null
          status?: string | null
          website?: string | null
        }
        Update: {
          age?: string | null
          city?: string | null
          created_at?: string | null
          cv_url?: string | null
          email?: string | null
          english_level?: string | null
          first_name?: string | null
          github?: string | null
          id?: number
          is_recommended?: boolean | null
          last_name?: string | null
          phone_number?: string | null
          score?: number | null
          skills?: string | null
          status?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
