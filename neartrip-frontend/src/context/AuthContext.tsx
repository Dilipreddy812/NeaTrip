// src/context/AuthContext.tsx

// We'll use the version with inline `type` imports. It's a modern best practice.
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

// This interface defines the "shape" of the data our context will provide.
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>; // The signOut function returns a Promise.
}

// Create the context with an initial value of undefined.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The AuthProvider component will wrap our app and provide the auth context.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for an active session when the component first loads.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Set up a listener that fires whenever the auth state changes (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup function: Unsubscribe from the listener when the component unmounts.
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // The value object holds all the data and functions we want to share.
  const value = {
    session,
    user: session?.user ?? null,
    loading,
    // We'll use the more concise version of the signOut function.
    signOut: () => supabase.auth.signOut(),
  };

  // While the initial session is being checked, show a loading indicator.
  // This prevents the UI from flickering between "logged out" and "logged in" states.
  if (loading) {
    return <div>Loading Auth...</div>; // You can replace this with a nice spinner component later.
  }

  // Once loading is complete, provide the context value to all child components.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// A custom hook to make it easier to use the auth context in other components.
export const useAuth = () => {
  const context = useContext(AuthContext);
  // If a component tries to use this hook outside of the AuthProvider, we throw an error.
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};