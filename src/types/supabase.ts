export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer: boolean;
          answerId: number;
          created_at: string;
          quiz_id: number;
          user_id: string;
        };
        Insert: {
          answer: boolean;
          answerId?: number;
          created_at?: string;
          quiz_id: number;
          user_id: string;
        };
        Update: {
          answer?: boolean;
          answerId?: number;
          created_at?: string;
          quiz_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "answers_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quizzes";
            referencedColumns: ["quizId"];
          },
          {
            foreignKeyName: "answers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["userId"];
          }
        ];
      };
      chat_rooms: {
        Row: {
          created_at: string;
          room_name: string;
          roomId: number;
        };
        Insert: {
          created_at?: string;
          room_name: string;
          roomId?: number;
        };
        Update: {
          created_at?: string;
          room_name?: string;
          roomId?: number;
        };
        Relationships: [];
      };
      chats: {
        Row: {
          chatId: string;
          content: string | null;
          created_at: string;
          image_url: string | null;
          room_id: number;
          user_id: string;
        };
        Insert: {
          chatId?: string;
          content?: string | null;
          created_at?: string;
          image_url?: string | null;
          room_id: number;
          user_id: string;
        };
        Update: {
          chatId?: string;
          content?: string | null;
          created_at?: string;
          image_url?: string | null;
          room_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chats_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "chat_rooms";
            referencedColumns: ["roomId"];
          },
          {
            foreignKeyName: "chats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["userId"];
          }
        ];
      };
      knowhow_comments: {
        Row: {
          content: string;
          created_at: string;
          knowhow_commentId: number;
          knowhow_post_id: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          knowhow_commentId?: number;
          knowhow_post_id: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          knowhow_commentId?: number;
          knowhow_post_id?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "knowhow_comments_knowhow_post_id_fkey";
            columns: ["knowhow_post_id"];
            isOneToOne: false;
            referencedRelation: "knowhow_posts";
            referencedColumns: ["knowhow_postId"];
          },
          {
            foreignKeyName: "knowhow_comments_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["userId"];
          }
        ];
      };
      knowhow_likes: {
        Row: {
          created_at: string;
          knowhow_likeId: number;
          knowhow_post_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          knowhow_likeId?: number;
          knowhow_post_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          knowhow_likeId?: number;
          knowhow_post_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "knowhow_likes_knowhow_post_id_fkey";
            columns: ["knowhow_post_id"];
            isOneToOne: false;
            referencedRelation: "knowhow_posts";
            referencedColumns: ["knowhow_postId"];
          },
          {
            foreignKeyName: "knowhow_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["userId"];
          }
        ];
      };
      knowhow_posts: {
        Row: {
          content: string;
          created_at: string;
          image_urls: Json | null;
          knowhow_postId: number;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          image_urls?: Json | null;
          knowhow_postId?: number;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          image_urls?: Json | null;
          knowhow_postId?: number;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "knowhow_posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["userId"];
          }
        ];
      };
      points: {
        Row: {
          created_at: string;
          point: number;
          pointId: number;
          reason: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          point?: number;
          pointId?: number;
          reason: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          point?: number;
          pointId?: number;
          reason?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "points_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["userId"];
          }
        ];
      };
      quizzes: {
        Row: {
          created_at: string;
          explanation: string;
          is_correct: boolean;
          issue_date: string;
          question: string;
          quizId: number;
        };
        Insert: {
          created_at?: string;
          explanation: string;
          is_correct: boolean;
          issue_date: string;
          question: string;
          quizId?: number;
        };
        Update: {
          created_at?: string;
          explanation?: string;
          is_correct?: boolean;
          issue_date?: string;
          question?: string;
          quizId?: number;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          current_point: number;
          email: string;
          nickname: string;
          provider: string;
          total_point: number;
          updated_at: string | null;
          userId: string;
        };
        Insert: {
          created_at?: string;
          current_point?: number;
          email: string;
          nickname: string;
          provider: string;
          total_point?: number;
          updated_at?: string | null;
          userId?: string;
        };
        Update: {
          created_at?: string;
          current_point?: number;
          email?: string;
          nickname?: string;
          provider?: string;
          total_point?: number;
          updated_at?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_userId_fkey";
            columns: ["userId"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      vote_comments: {
        Row: {
          content: string;
          created_at: string;
          updated_at: string | null;
          user_id: string;
          vote_commentId: number;
          vote_post_id: number;
        };
        Insert: {
          content: string;
          created_at?: string;
          updated_at?: string | null;
          user_id: string;
          vote_commentId?: number;
          vote_post_id: number;
        };
        Update: {
          content?: string;
          created_at?: string;
          updated_at?: string | null;
          user_id?: string;
          vote_commentId?: number;
          vote_post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "vote_comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["userId"];
          },
          {
            foreignKeyName: "vote_comments_vote_post_id_fkey";
            columns: ["vote_post_id"];
            isOneToOne: false;
            referencedRelation: "vote_posts";
            referencedColumns: ["vote_postId"];
          }
        ];
      };
      vote_likes: {
        Row: {
          created_at: string;
          is_upvote: boolean;
          user_id: string;
          vote_likeId: number;
          vote_post_id: number;
        };
        Insert: {
          created_at?: string;
          is_upvote: boolean;
          user_id: string;
          vote_likeId?: number;
          vote_post_id: number;
        };
        Update: {
          created_at?: string;
          is_upvote?: boolean;
          user_id?: string;
          vote_likeId?: number;
          vote_post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "vote_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["userId"];
          },
          {
            foreignKeyName: "vote_likes_vote_post_id_fkey";
            columns: ["vote_post_id"];
            isOneToOne: false;
            referencedRelation: "vote_posts";
            referencedColumns: ["vote_postId"];
          }
        ];
      };
      vote_posts: {
        Row: {
          content: string;
          created_at: string;
          image_url: string;
          product_name: string;
          product_price: number;
          title: string;
          updated_at: string | null;
          user_id: string;
          vote_postId: number;
        };
        Insert: {
          content: string;
          created_at?: string;
          image_url: string;
          product_name: string;
          product_price?: number;
          title: string;
          updated_at?: string | null;
          user_id: string;
          vote_postId?: number;
        };
        Update: {
          content?: string;
          created_at?: string;
          image_url?: string;
          product_name?: string;
          product_price?: number;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
          vote_postId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "vote_posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["userId"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_posts_with_likes_and_nickname: {
        Args: {
          limit_param: number;
          offset_param: number;
          search_option: string;
          search_keyword: string;
          sort_order: string;
        };
        Returns: {
          knowhow_postId: number;
          title: string;
          content: string;
          image_urls: Json;
          created_at: string;
          updated_at: string;
          user_id: string;
          nickname: string;
          likes_count: number;
          comments_count: number;
          total_count: number;
        }[];
      };
      get_votes_with_counts_and_nickname: {
        Args: Record<PropertyKey, never>;
        Returns: {
          vote_postId: number;
          title: string;
          content: string;
          product_name: string;
          product_price: string;
          image_url: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          nickname: string;
          votes_count: number;
          comments_count: number;
        }[];
      };
      increment_user_points: {
        Args: {
          user_id: string;
          points_to_add: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
