import { use } from "react";
import { AuthContext, AuthContextType } from "../auth/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = use(AuthContext)
  
  if (!context) {
    throw new Error('useAuth need used on AuthProvider')
  }

  return context;
}