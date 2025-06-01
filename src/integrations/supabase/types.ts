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
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string | null
          date: string
          doctor_id: string
          id: string
          reason: string | null
          status: string
          time_slot: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          doctor_id: string
          id?: string
          reason?: string | null
          status?: string
          time_slot: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          doctor_id?: string
          id?: string
          reason?: string | null
          status?: string
          time_slot?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string
          id: string
          image_url: string | null
          is_premium: boolean | null
          published_at: string | null
          read_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          excerpt: string
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          published_at?: string | null
          read_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          published_at?: string | null
          read_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          comments_count: number | null
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comments_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comments_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      doctor: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      doctors: {
        Row: {
          available_days: string[]
          bio: string | null
          created_at: string | null
          email: string | null
          experience: string
          id: string
          image_url: string | null
          languages: string[]
          location: string | null
          name: string
          next_available: string | null
          phone: string | null
          price: number
          rating: number
          review_count: number
          specialty: string
          updated_at: string | null
        }
        Insert: {
          available_days: string[]
          bio?: string | null
          created_at?: string | null
          email?: string | null
          experience: string
          id?: string
          image_url?: string | null
          languages?: string[]
          location?: string | null
          name: string
          next_available?: string | null
          phone?: string | null
          price: number
          rating?: number
          review_count?: number
          specialty: string
          updated_at?: string | null
        }
        Update: {
          available_days?: string[]
          bio?: string | null
          created_at?: string | null
          email?: string | null
          experience?: string
          id?: string
          image_url?: string | null
          languages?: string[]
          location?: string | null
          name?: string
          next_available?: string | null
          phone?: string | null
          price?: number
          rating?: number
          review_count?: number
          specialty?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      emergency_reports: {
        Row: {
          category: string
          contact_info: string | null
          created_at: string | null
          description: string
          id: string
          location: string
          status: string
          title: string
          updated_at: string | null
          urgency_level: string
          user_id: string | null
        }
        Insert: {
          category: string
          contact_info?: string | null
          created_at?: string | null
          description: string
          id?: string
          location: string
          status?: string
          title: string
          updated_at?: string | null
          urgency_level: string
          user_id?: string | null
        }
        Update: {
          category?: string
          contact_info?: string | null
          created_at?: string | null
          description?: string
          id?: string
          location?: string
          status?: string
          title?: string
          updated_at?: string | null
          urgency_level?: string
          user_id?: string | null
        }
        Relationships: []
      }
      gym_media: {
        Row: {
          created_at: string | null
          gym_id: string
          id: string
          is_featured: boolean | null
          media_type: string
          url: string
        }
        Insert: {
          created_at?: string | null
          gym_id: string
          id?: string
          is_featured?: boolean | null
          media_type: string
          url: string
        }
        Update: {
          created_at?: string | null
          gym_id?: string
          id?: string
          is_featured?: boolean | null
          media_type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_media_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          gym_id: string
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          gym_id: string
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          gym_id?: string
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_reviews_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
        ]
      }
      gyms: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          facilities: Json | null
          id: string
          is_approved: boolean | null
          is_premium: boolean | null
          location: string
          location_pincode: string
          name: string
          opening_hours: Json | null
          owner_id: string
          owner_name: string
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          facilities?: Json | null
          id?: string
          is_approved?: boolean | null
          is_premium?: boolean | null
          location: string
          location_pincode: string
          name: string
          opening_hours?: Json | null
          owner_id: string
          owner_name: string
          updated_at?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          facilities?: Json | null
          id?: string
          is_approved?: boolean | null
          is_premium?: boolean | null
          location?: string
          location_pincode?: string
          name?: string
          opening_hours?: Json | null
          owner_id?: string
          owner_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          created_at: string | null
          desired_role: string
          id: string
          job_id: string
          preferred_location: string | null
          resume_url: string | null
          status: string
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string
          created_at?: string | null
          desired_role: string
          id?: string
          job_id: string
          preferred_location?: string | null
          resume_url?: string | null
          status?: string
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string
          created_at?: string | null
          desired_role?: string
          id?: string
          job_id?: string
          preferred_location?: string | null
          resume_url?: string | null
          status?: string
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          created_at: string | null
          deadline: string | null
          description: string
          experience_required: string | null
          gym_id: string
          id: string
          is_active: boolean | null
          salary_range: string | null
          title: string
          updated_at: string | null
          working_hours: string | null
        }
        Insert: {
          created_at?: string | null
          deadline?: string | null
          description: string
          experience_required?: string | null
          gym_id: string
          id?: string
          is_active?: boolean | null
          salary_range?: string | null
          title: string
          updated_at?: string | null
          working_hours?: string | null
        }
        Update: {
          created_at?: string | null
          deadline?: string | null
          description?: string
          experience_required?: string | null
          gym_id?: string
          id?: string
          is_active?: boolean | null
          salary_range?: string | null
          title?: string
          updated_at?: string | null
          working_hours?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          fitness_goal: string | null
          food_preference: string | null
          full_name: string | null
          gender: string | null
          health_issues: string | null
          height: number | null
          id: string
          updated_at: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          fitness_goal?: string | null
          food_preference?: string | null
          full_name?: string | null
          gender?: string | null
          health_issues?: string | null
          height?: number | null
          id?: string
          updated_at?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          fitness_goal?: string | null
          food_preference?: string | null
          full_name?: string | null
          gender?: string | null
          health_issues?: string | null
          height?: number | null
          id?: string
          updated_at?: string | null
          user_id?: string
          weight?: number | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
