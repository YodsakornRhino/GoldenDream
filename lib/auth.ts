import { supabase } from './supabase'

export async function signUp(email: string, password: string, userData?: {
  name?: string
  phone?: string
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })

  if (error) {
    console.error('Error signing up:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Error signing in:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error signing out:', error)
    return { error }
  }

  return { error: null }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error getting current user:', error)
    return { user: null, error }
  }

  return { user, error: null }
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    console.error('Error resetting password:', error)
    return { error }
  }

  return { error: null }
}