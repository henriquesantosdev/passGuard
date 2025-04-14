import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  created_at: string;
  token: string
}

export interface AuthContextType {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
  verifySignedUser: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)