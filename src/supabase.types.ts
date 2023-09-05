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
      check_in: {
        Row: {
          check_in_id: string
          check_in_out_time: string
          child_id: string | null
          daycare_id: string
          teacher_id: string | null
        }
        Insert: {
          check_in_id?: string
          check_in_out_time?: string
          child_id?: string | null
          daycare_id: string
          teacher_id?: string | null
        }
        Update: {
          check_in_id?: string
          check_in_out_time?: string
          child_id?: string | null
          daycare_id?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "check_in_child_id_fkey"
            columns: ["child_id"]
            referencedRelation: "children"
            referencedColumns: ["child_id"]
          },
          {
            foreignKeyName: "check_in_daycare_id_fkey"
            columns: ["daycare_id"]
            referencedRelation: "daycares"
            referencedColumns: ["daycare_id"]
          },
          {
            foreignKeyName: "check_in_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "teachers"
            referencedColumns: ["teacher_id"]
          }
        ]
      }
      children: {
        Row: {
          allergy: string | null
          birthday: string
          child_id: string
          created_at: string
          daycare_id: string
          enrolled_day: string
          is_active: boolean
          name: string
        }
        Insert: {
          allergy?: string | null
          birthday: string
          child_id?: string
          created_at?: string
          daycare_id: string
          enrolled_day: string
          is_active?: boolean
          name: string
        }
        Update: {
          allergy?: string | null
          birthday?: string
          child_id?: string
          created_at?: string
          daycare_id?: string
          enrolled_day?: string
          is_active?: boolean
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_daycare_id_fkey"
            columns: ["daycare_id"]
            referencedRelation: "daycares"
            referencedColumns: ["daycare_id"]
          }
        ]
      }
      daycares: {
        Row: {
          address: string | null
          created_at: string
          daycare_id: string
          is_active: boolean
          name: string
          phone_number: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          daycare_id?: string
          is_active?: boolean
          name: string
          phone_number?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          daycare_id?: string
          is_active?: boolean
          name?: string
          phone_number?: string | null
        }
        Relationships: []
      }
      teachers: {
        Row: {
          created_at: string
          daycare_id: string
          name: string
          phone_number: string | null
          teacher_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daycare_id: string
          name: string
          phone_number?: string | null
          teacher_id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          daycare_id?: string
          name?: string
          phone_number?: string | null
          teacher_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teachers_daycare_id_fkey"
            columns: ["daycare_id"]
            referencedRelation: "daycares"
            referencedColumns: ["daycare_id"]
          }
        ]
      }
      users: {
        Row: {
          daycare_id: string
          email: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          daycare_id: string
          email: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          daycare_id?: string
          email?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: [
          {
            foreignKeyName: "user_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_daycare_id_fkey"
            columns: ["daycare_id"]
            referencedRelation: "daycares"
            referencedColumns: ["daycare_id"]
          },
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      check_in_out: "check_in" | "check_out"
      user_type: "admin" | "teacher" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
