"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, isMock } from "../lib/firebase";

type User = {
  uid: string;
  email: string | null;
  plan?: string;
} | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  signInMock: () => void;
  signOutMock: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInMock: () => {},
  signOutMock: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const signInMock = () => {
    setUser({ uid: "mock-uid", email: "demo@example.com", plan: "pro" });
  };

  const signOutMock = () => {
    setUser(null);
  };

  useEffect(() => {
    if (isMock) {
      // Setup mock user for preview purposes immediately or let user login mock
      setLoading(false);
      return;
    }

    if (!auth?.onAuthStateChanged) return;
    
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signInMock, signOutMock }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
