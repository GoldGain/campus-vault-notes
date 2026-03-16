import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut, getCurrentUser } from '@/lib/supabase';
import type { User, Purchase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, password: string, regNumber?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasAccess: (resourceType: string) => boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // Check for active session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUser(profile as User);
          setIsAuthenticated(true);
        }
      }
      
      setIsLoading(false);
    };
    
    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUser(profile as User);
          setIsAuthenticated(true);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabaseSignIn(email, password);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profile) {
        setUser(profile as User);
        setIsAuthenticated(true);
        return { success: true };
      }
    }
    
    return { success: false, error: 'Failed to load user profile' };
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    regNumber?: string
  ) => {
    const { data, error } = await supabaseSignUp(email, password, {
      name,
      phone,
      reg_number: regNumber
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    // Create profile in profiles table
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          name,
          phone,
          reg_number: regNumber,
          role: 'student'
        });
      
      if (profileError) {
        return { success: false, error: profileError.message };
      }
      
      // Get the created profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profile) {
        setUser(profile as User);
        setIsAuthenticated(true);
      }
      
      return { success: true };
    }
    
    return { success: false, error: 'Failed to create account' };
  };

  const logout = async () => {
    await supabaseSignOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUser = async () => {
    if (user?.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setUser(profile as User);
      }
    }
  };

  const hasAccess = (resourceType: string): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    
    // Check user's purchases for access
    // This would need to be implemented with actual purchase data
    return true; // Simplified for now
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.role === 'admin',
        isLoading,
        login,
        signup,
        logout,
        hasAccess,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
