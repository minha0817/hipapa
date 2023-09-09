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
      activity_reports: {
        Row: {
          activity_report_id: string
          created_at: string
          description: string
          photo: string | null
          time: string
        }
        Insert: {
          activity_report_id?: string
          created_at?: string
          description: string
          photo?: string | null
          time?: string
        }
        Update: {
          activity_report_id?: string
          created_at?: string
          description?: string
          photo?: string | null
          time?: string
        }
        Relationships: []
      }
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
          parent_id: string
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
          parent_id: string
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
          parent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_daycare_id_fkey"
            columns: ["daycare_id"]
            referencedRelation: "daycares"
            referencedColumns: ["daycare_id"]
          },
          {
            foreignKeyName: "children_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "parents"
            referencedColumns: ["parent_id"]
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
      incident_reports: {
        Row: {
          created_at: string
          description: string
          incident_report_id: string
          photo: string | null
          time: string
        }
        Insert: {
          created_at?: string
          description: string
          incident_report_id?: string
          photo?: string | null
          time?: string
        }
        Update: {
          created_at?: string
          description?: string
          incident_report_id?: string
          photo?: string | null
          time?: string
        }
        Relationships: []
      }
      meal_reports: {
        Row: {
          child_id: string
          created_at: string
          description: string | null
          meal_report_id: string
          meal_type: Database["public"]["Enums"]["meal_type"]
          photo: string | null
          quantity: Database["public"]["Enums"]["quantity"]
          time: string
        }
        Insert: {
          child_id: string
          created_at?: string
          description?: string | null
          meal_report_id?: string
          meal_type: Database["public"]["Enums"]["meal_type"]
          photo?: string | null
          quantity: Database["public"]["Enums"]["quantity"]
          time?: string
        }
        Update: {
          child_id?: string
          created_at?: string
          description?: string | null
          meal_report_id?: string
          meal_type?: Database["public"]["Enums"]["meal_type"]
          photo?: string | null
          quantity?: Database["public"]["Enums"]["quantity"]
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_reports_child_id_fkey"
            columns: ["child_id"]
            referencedRelation: "children"
            referencedColumns: ["child_id"]
          }
        ]
      }
      parents: {
        Row: {
          created_at: string
          parent_address: string | null
          parent_email: string
          parent_id: string
          parent_name: string
          phone_number: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          parent_address?: string | null
          parent_email: string
          parent_id?: string
          parent_name: string
          phone_number?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          parent_address?: string | null
          parent_email?: string
          parent_id?: string
          parent_name?: string
          phone_number?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parents_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      report_children: {
        Row: {
          activity_report_id: string | null
          child_id: string
          incident_report_id: string | null
          report_children_id: string
        }
        Insert: {
          activity_report_id?: string | null
          child_id: string
          incident_report_id?: string | null
          report_children_id?: string
        }
        Update: {
          activity_report_id?: string | null
          child_id?: string
          incident_report_id?: string | null
          report_children_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_children_activity_report_id_fkey"
            columns: ["activity_report_id"]
            referencedRelation: "activity_reports"
            referencedColumns: ["activity_report_id"]
          },
          {
            foreignKeyName: "report_children_child_id_fkey"
            columns: ["child_id"]
            referencedRelation: "children"
            referencedColumns: ["child_id"]
          },
          {
            foreignKeyName: "report_children_incident_report_id_fkey"
            columns: ["incident_report_id"]
            referencedRelation: "incident_reports"
            referencedColumns: ["incident_report_id"]
          }
        ]
      }
      sleep_reports: {
        Row: {
          child_id: string
          created_at: string
          description: string | null
          nap_end_time: string
          nap_start_time: string
          photo: string | null
          sleep_report_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          description?: string | null
          nap_end_time: string
          nap_start_time: string
          photo?: string | null
          sleep_report_id?: string
        }
        Update: {
          child_id?: string
          created_at?: string
          description?: string | null
          nap_end_time?: string
          nap_start_time?: string
          photo?: string | null
          sleep_report_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sleep_reports_child_id_fkey"
            columns: ["child_id"]
            referencedRelation: "children"
            referencedColumns: ["child_id"]
          }
        ]
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
          },
          {
            foreignKeyName: "teachers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
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
      meal_type: "morning_snack" | "lunch" | "afternoon_snack"
      quantity: "all" | "most" | "some" | "none"
      user_type: "admin" | "teacher" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
