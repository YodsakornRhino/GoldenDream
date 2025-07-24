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
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          location: string
          bedrooms: number
          bathrooms: number
          square_feet: number
          property_type: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land'
          listing_type: 'sale' | 'rent'
          status: 'active' | 'pending' | 'sold' | 'rented'
          images: string[] | null
          features: string[] | null
          agent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          location: string
          bedrooms: number
          bathrooms: number
          square_feet: number
          property_type: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land'
          listing_type: 'sale' | 'rent'
          status?: 'active' | 'pending' | 'sold' | 'rented'
          images?: string[] | null
          features?: string[] | null
          agent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          location?: string
          bedrooms?: number
          bathrooms?: number
          square_feet?: number
          property_type?: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land'
          listing_type?: 'sale' | 'rent'
          status?: 'active' | 'pending' | 'sold' | 'rented'
          images?: string[] | null
          features?: string[] | null
          agent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      agents: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string | null
          bio: string | null
          specialties: string[] | null
          rating: number | null
          reviews_count: number
          sales_count: number
          experience_years: number | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone?: string | null
          bio?: string | null
          specialties?: string[] | null
          rating?: number | null
          reviews_count?: number
          sales_count?: number
          experience_years?: number | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string | null
          bio?: string | null
          specialties?: string[] | null
          rating?: number | null
          reviews_count?: number
          sales_count?: number
          experience_years?: number | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          property_id: string | null
          agent_id: string | null
          name: string
          email: string
          phone: string | null
          message: string
          inquiry_type: 'viewing' | 'information' | 'offer' | 'general'
          status: 'new' | 'contacted' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          agent_id?: string | null
          name: string
          email: string
          phone?: string | null
          message: string
          inquiry_type?: 'viewing' | 'information' | 'offer' | 'general'
          status?: 'new' | 'contacted' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string | null
          agent_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          message?: string
          inquiry_type?: 'viewing' | 'information' | 'offer' | 'general'
          status?: 'new' | 'contacted' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          created_at?: string
        }
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