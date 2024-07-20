export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer_id: number
          created_at: string
          is_answer: boolean
          quiz_id: number
          user_id: string
        }
        Insert: {
          answer_id?: number
          created_at?: string
          is_answer: boolean
          quiz_id: number
          user_id: string
        }
        Update: {
          answer_id?: number
          created_at?: string
          is_answer?: boolean
          quiz_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["quiz_id"]
          },
          {
            foreignKeyName: "answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      points: {
        Row: {
          created_at: string
          point: number
          point_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          point: number
          point_id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          point?: number
          point_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          explanation: string
          is_correct: boolean
          issue_date: string
          question: string
          quiz_id: number
        }
        Insert: {
          created_at?: string
          explanation: string
          is_correct: boolean
          issue_date: string
          question: string
          quiz_id?: number
        }
        Update: {
          created_at?: string
          explanation?: string
          is_correct?: boolean
          issue_date?: string
          question?: string
          quiz_id?: number
        }
        Relationships: []
      }
      spending_comments: {
        Row: {
          content: string
          created_at: string
          spending_comment_id: string
          spending_post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          spending_comment_id?: string
          spending_post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          spending_comment_id?: string
          spending_post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spending_comments_spending_post_id_fkey"
            columns: ["spending_post_id"]
            isOneToOne: false
            referencedRelation: "spending_posts"
            referencedColumns: ["spending_post_id"]
          },
          {
            foreignKeyName: "spending_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      spending_likes: {
        Row: {
          created_at: string
          is_upvote: boolean
          spending_like_id: string
          spending_post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          is_upvote: boolean
          spending_like_id?: string
          spending_post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          is_upvote?: boolean
          spending_like_id?: string
          spending_post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spending_likes_spending_post_id_fkey"
            columns: ["spending_post_id"]
            isOneToOne: false
            referencedRelation: "spending_posts"
            referencedColumns: ["spending_post_id"]
          },
          {
            foreignKeyName: "spending_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      spending_posts: {
        Row: {
          content: string
          created_at: string
          image_url: string
          product_name: string
          product_price: number
          spending_post_id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          image_url: string
          product_name: string
          product_price: number
          spending_post_id?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          image_url?: string
          product_name?: string
          product_price?: number
          spending_post_id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spending_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tip_comments: {
        Row: {
          content: string
          created_at: string
          tip_comment_id: string
          tip_post_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          tip_comment_id?: string
          tip_post_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          tip_comment_id?: string
          tip_post_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tip_comments_tip_post_id_fkey"
            columns: ["tip_post_id"]
            isOneToOne: false
            referencedRelation: "tip_posts"
            referencedColumns: ["tip_post_id"]
          },
          {
            foreignKeyName: "tip_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tip_likes: {
        Row: {
          created_at: string
          tip_like_id: string
          tip_post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          tip_like_id?: string
          tip_post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          tip_like_id?: string
          tip_post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tip_likes_tip_post_id_fkey"
            columns: ["tip_post_id"]
            isOneToOne: false
            referencedRelation: "tip_posts"
            referencedColumns: ["tip_post_id"]
          },
          {
            foreignKeyName: "tip_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tip_posts: {
        Row: {
          content: string
          created_at: string
          image_url: string | null
          likes_count: number
          tip_post_id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          image_url?: string | null
          likes_count: number
          tip_post_id?: string
          title: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          image_url?: string | null
          likes_count?: number
          tip_post_id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tip_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          current_point: number
          email: string
          nickname: string
          provider: string
          total_point: number
          user_id: string
        }
        Insert: {
          created_at?: string
          current_point: number
          email: string
          nickname: string
          provider: string
          total_point: number
          user_id?: string
        }
        Update: {
          created_at?: string
          current_point?: number
          email?: string
          nickname?: string
          provider?: string
          total_point?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
