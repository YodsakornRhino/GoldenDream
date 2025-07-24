import { supabase } from './supabase'
import { Database } from './database.types'

type Property = Database['public']['Tables']['properties']['Row']
type Agent = Database['public']['Tables']['agents']['Row']
type Inquiry = Database['public']['Tables']['inquiries']['Insert']

// Property queries
export async function getProperties(filters?: {
  listing_type?: 'sale' | 'rent'
  property_type?: string
  min_price?: number
  max_price?: number
  bedrooms?: number
  location?: string
}) {
  let query = supabase
    .from('properties')
    .select(`
      *,
      agents (
        id,
        name,
        email,
        phone,
        rating
      )
    `)
    .eq('status', 'active')

  if (filters?.listing_type) {
    query = query.eq('listing_type', filters.listing_type)
  }

  if (filters?.property_type) {
    query = query.eq('property_type', filters.property_type)
  }

  if (filters?.min_price) {
    query = query.gte('price', filters.min_price)
  }

  if (filters?.max_price) {
    query = query.lte('price', filters.max_price)
  }

  if (filters?.bedrooms) {
    query = query.gte('bedrooms', filters.bedrooms)
  }

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching properties:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      agents (
        id,
        name,
        email,
        phone,
        rating,
        bio,
        experience_years
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching property:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function getFeaturedProperties(limit = 6) {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      agents (
        id,
        name,
        email,
        phone,
        rating
      )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured properties:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

// Agent queries
export async function getAgents() {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .order('rating', { ascending: false })

  if (error) {
    console.error('Error fetching agents:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function getAgentById(id: string) {
  const { data, error } = await supabase
    .from('agents')
    .select(`
      *,
      properties (
        id,
        title,
        price,
        location,
        bedrooms,
        bathrooms,
        square_feet,
        property_type,
        listing_type,
        status
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching agent:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

// Inquiry functions
export async function createInquiry(inquiry: Inquiry) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiry)
    .select()
    .single()

  if (error) {
    console.error('Error creating inquiry:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

// Favorites functions
export async function addToFavorites(userId: string, propertyId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, property_id: propertyId })
    .select()
    .single()

  if (error) {
    console.error('Error adding to favorites:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function removeFromFavorites(userId: string, propertyId: string) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('property_id', propertyId)

  if (error) {
    console.error('Error removing from favorites:', error)
    return { error }
  }

  return { error: null }
}

export async function getUserFavorites(userId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      *,
      properties (
        *,
        agents (
          id,
          name,
          email,
          phone,
          rating
        )
      )
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching user favorites:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function checkIsFavorite(userId: string, propertyId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('property_id', propertyId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking favorite status:', error)
    return { isFavorite: false, error }
  }

  return { isFavorite: !!data, error: null }
}