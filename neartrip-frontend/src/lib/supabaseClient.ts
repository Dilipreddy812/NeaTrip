// TODO: Initialize Supabase client here
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Placeholder export:
export const supabase = {
  auth: {
    getSession: async () => {
      console.log('Placeholder supabase.auth.getSession called');
      return { data: { session: null }, error: null };
    },
    onAuthStateChange: (callback: any) => {
      console.log('Placeholder supabase.auth.onAuthStateChange called');
      // Simulate an initial null session state after a short delay
      setTimeout(() => callback('INITIAL_SESSION', null), 100);
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              console.log('Placeholder supabase.auth.onAuthStateChange unsubscribed');
            },
          },
        },
        error: null,
      };
    },
    signInWithOtp: async (options: { email: string }) => {
      console.log('Placeholder supabase.auth.signInWithOtp called with', options.email);
      return { error: null };
    },
    signOut: async () => {
      console.log('Placeholder supabase.auth.signOut called');
      return { error: null };
    },
  },
};
