export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          admin_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          priority: string | null
          related_id: string | null
          title: string
          type: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          priority?: string | null
          related_id?: string | null
          title: string
          type: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          priority?: string | null
          related_id?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
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
      admin_workflow_tasks: {
        Row: {
          assigned_admin_id: string | null
          completed_at: string | null
          created_at: string | null
          due_date: string | null
          id: string
          priority: string | null
          product_id: string | null
          status: string | null
          task_type: string
        }
        Insert: {
          assigned_admin_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          product_id?: string | null
          status?: string | null
          task_type: string
        }
        Update: {
          assigned_admin_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          product_id?: string | null
          status?: string | null
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_workflow_tasks_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
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
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
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
      daily_progress: {
        Row: {
          created_at: string
          date: string
          exercises: Json | null
          id: string
          mood: string | null
          notes: string | null
          sleep_hours: number | null
          updated_at: string
          user_id: string
          water_intake: number | null
          weight: number | null
        }
        Insert: {
          created_at?: string
          date: string
          exercises?: Json | null
          id?: string
          mood?: string | null
          notes?: string | null
          sleep_hours?: number | null
          updated_at?: string
          user_id: string
          water_intake?: number | null
          weight?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          exercises?: Json | null
          id?: string
          mood?: string | null
          notes?: string | null
          sleep_hours?: number | null
          updated_at?: string
          user_id?: string
          water_intake?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      diet_plan_meals: {
        Row: {
          calories: number | null
          created_at: string
          day_of_week: string
          diet_plan_id: string
          food_name: string
          id: string
          meal_type: string
          quantity: string | null
        }
        Insert: {
          calories?: number | null
          created_at?: string
          day_of_week: string
          diet_plan_id: string
          food_name: string
          id?: string
          meal_type: string
          quantity?: string | null
        }
        Update: {
          calories?: number | null
          created_at?: string
          day_of_week?: string
          diet_plan_id?: string
          food_name?: string
          id?: string
          meal_type?: string
          quantity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diet_plan_meals_diet_plan_id_fkey"
            columns: ["diet_plan_id"]
            isOneToOne: false
            referencedRelation: "diet_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      diet_plans: {
        Row: {
          created_at: string
          goal: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          goal: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          goal?: string
          id?: string
          name?: string
          updated_at?: string
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
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          price_per_item: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price_per_item: number
          product_id?: string | null
          quantity: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price_per_item?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          delivery_address: Json | null
          id: string
          status: string | null
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          delivery_address?: Json | null
          id?: string
          status?: string | null
          total_amount: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          delivery_address?: Json | null
          id?: string
          status?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      period_tracking: {
        Row: {
          created_at: string
          cycle_length: number | null
          id: string
          last_period_date: string | null
          notes: string | null
          period_length: number | null
          symptoms: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          cycle_length?: number | null
          id?: string
          last_period_date?: string | null
          notes?: string | null
          period_length?: number | null
          symptoms?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          cycle_length?: number | null
          id?: string
          last_period_date?: string | null
          notes?: string | null
          period_length?: number | null
          symptoms?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          product_id: string | null
          rating: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_workflow_history: {
        Row: {
          admin_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          product_id: string | null
          status_from: string | null
          status_to: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          product_id?: string | null
          status_from?: string | null
          status_to: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          product_id?: string | null
          status_from?: string | null
          status_to?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_workflow_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          admin_notes: string | null
          allergens: string[] | null
          auto_health_score: number | null
          brand: string
          category: Database["public"]["Enums"]["product_category"]
          created_at: string | null
          description: string | null
          health_impact_summary: string | null
          health_score: number | null
          id: string
          image_urls: string[] | null
          ingredients: Json | null
          is_organic: boolean | null
          is_vegan: boolean | null
          is_vegetarian: boolean | null
          manual_override: boolean | null
          name: string
          nutritional_info: Json | null
          price: number
          review_count: number | null
          seller_id: string | null
          status: Database["public"]["Enums"]["product_status"] | null
          stock_quantity: number | null
          subcategory: string | null
          updated_at: string | null
          user_rating: number | null
          workflow_status: string | null
        }
        Insert: {
          admin_notes?: string | null
          allergens?: string[] | null
          auto_health_score?: number | null
          brand: string
          category: Database["public"]["Enums"]["product_category"]
          created_at?: string | null
          description?: string | null
          health_impact_summary?: string | null
          health_score?: number | null
          id?: string
          image_urls?: string[] | null
          ingredients?: Json | null
          is_organic?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          manual_override?: boolean | null
          name: string
          nutritional_info?: Json | null
          price: number
          review_count?: number | null
          seller_id?: string | null
          status?: Database["public"]["Enums"]["product_status"] | null
          stock_quantity?: number | null
          subcategory?: string | null
          updated_at?: string | null
          user_rating?: number | null
          workflow_status?: string | null
        }
        Update: {
          admin_notes?: string | null
          allergens?: string[] | null
          auto_health_score?: number | null
          brand?: string
          category?: Database["public"]["Enums"]["product_category"]
          created_at?: string | null
          description?: string | null
          health_impact_summary?: string | null
          health_score?: number | null
          id?: string
          image_urls?: string[] | null
          ingredients?: Json | null
          is_organic?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          manual_override?: boolean | null
          name?: string
          nutritional_info?: Json | null
          price?: number
          review_count?: number | null
          seller_id?: string | null
          status?: Database["public"]["Enums"]["product_status"] | null
          stock_quantity?: number | null
          subcategory?: string | null
          updated_at?: string | null
          user_rating?: number | null
          workflow_status?: string | null
        }
        Relationships: []
      }
      shopping_cart: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          quantity: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_cart_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          activity_level: string | null
          allergies: string | null
          created_at: string | null
          date_of_birth: string | null
          fitness_goal: string | null
          food_preference: string | null
          full_name: string | null
          gender: string | null
          health_issues: string | null
          height: number | null
          id: string
          is_banned: boolean | null
          medical_conditions: string | null
          notification_preferences: Json | null
          period_tracking: Json | null
          privacy_settings: Json | null
          target_weight: number | null
          updated_at: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          activity_level?: string | null
          allergies?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          fitness_goal?: string | null
          food_preference?: string | null
          full_name?: string | null
          gender?: string | null
          health_issues?: string | null
          height?: number | null
          id?: string
          is_banned?: boolean | null
          medical_conditions?: string | null
          notification_preferences?: Json | null
          period_tracking?: Json | null
          privacy_settings?: Json | null
          target_weight?: number | null
          updated_at?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          activity_level?: string | null
          allergies?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          fitness_goal?: string | null
          food_preference?: string | null
          full_name?: string | null
          gender?: string | null
          health_issues?: string | null
          height?: number | null
          id?: string
          is_banned?: boolean | null
          medical_conditions?: string | null
          notification_preferences?: Json | null
          period_tracking?: Json | null
          privacy_settings?: Json | null
          target_weight?: number | null
          updated_at?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_age: {
        Args: { birth_date: string }
        Returns: number
      }
      calculate_auto_health_score: {
        Args: { ingredients_list: Json }
        Returns: number
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_doctor_details: {
        Args: { doctor_id: string }
        Returns: {
          available_days: string[]
          bio: string
          created_at: string
          email: string
          experience: string
          id: string
          image_url: string
          languages: string[]
          location: string
          name: string
          next_available: string
          phone: string
          price: number
          rating: number
          review_count: number
          specialty: string
          updated_at: string
        }[]
      }
      get_doctors_public: {
        Args: { specialty_filter?: string }
        Returns: {
          available_days: string[]
          bio: string
          created_at: string
          experience: string
          id: string
          image_url: string
          languages: string[]
          location: string
          name: string
          next_available: string
          price: number
          rating: number
          review_count: number
          specialty: string
          updated_at: string
        }[]
      }
      get_user_email: {
        Args: { user_uuid: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      user_has_appointment_with_doctor: {
        Args: { doctor_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      product_category: "food" | "supplements" | "fitness_gear" | "wellness"
      product_status: "active" | "inactive" | "pending_approval"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      product_category: ["food", "supplements", "fitness_gear", "wellness"],
      product_status: ["active", "inactive", "pending_approval"],
    },
  },
} as const
