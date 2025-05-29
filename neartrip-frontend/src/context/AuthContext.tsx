import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Changed import path
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js'; // Added AuthChangeEvent

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) { // Handled error
        console.error('Error fetching session:', error);
      }
      if (session) {
        setSession(session);
        setUser(session.user);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, sessionState: Session | null) => { // Added types for _event and sessionState
        setSession(sessionState);
        setUser(sessionState?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string) => {
    // @ts-ignore remains for now as supabaseClient is a placeholder
    await supabase.auth.signInWithOtp({ email });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
