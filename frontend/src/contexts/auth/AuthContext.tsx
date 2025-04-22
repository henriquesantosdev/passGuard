import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  created_at: string;
  token: string
  passphrase?: string
}

export interface AuthContextType {
  signed: boolean;
  user: User | null;
  loading: boolean;
  userCreated: boolean;
  setUserCreated: (userCreated: boolean) => void
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, passphrase: string) => void;
  signOut: () => void;
  verifySignedUser: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)