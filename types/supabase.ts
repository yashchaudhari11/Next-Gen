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
      courses: {
        Row: {
          id: string
          title: string
          progress: number
          icon_name: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          progress: number
          icon_name: string
          created_at?: string
        }
        Update: {
          id?: string
          title: string
          progress?: number
          icon_name?: string
          created_at?: string
        }
        Relationships: []
      }
      weekly_stats: {
        Row: {
          id: string
          day: string
          hours: string | number
          completed: number
          order_idx: number
        }
        Insert: {
          id?: string
          day: string
          hours: string | number
          completed: number
          order_idx: number
        }
        Update: {
          id?: string
          day?: string
          hours?: string | number
          completed?: number
          order_idx?: number
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          id: string
          action: string
          subject: string
          time_ago: string
          created_at: string
        }
        Insert: {
          id?: string
          action: string
          subject: string
          time_ago: string
          created_at?: string
        }
        Update: {
          id?: string
          action?: string
          subject?: string
          time_ago?: string
          created_at?: string
        }
        Relationships: []
      }
      leaderboard: {
        Row: {
          id: string
          rank: number
          name: string
          xp: number
          streak: number
          initials: string
          change: string
          plan: string
          is_user: boolean
        }
        Insert: {
          id?: string
          rank: number
          name: string
          xp: number
          streak: number
          initials: string
          change: string
          plan: string
          is_user?: boolean
        }
        Update: {
          id?: string
          rank?: number
          name?: string
          xp?: number
          streak?: number
          initials?: string
          change?: string
          plan?: string
          is_user?: boolean
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
