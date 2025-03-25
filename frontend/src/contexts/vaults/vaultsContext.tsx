import { createContext } from "react";

export interface Vault {
  id: string;
  'service_name': string;
  password: string;
  username: string;
  created_at: string;
  email: string;
}

export interface VaultContextType {
  getVaults: () => void;
  loading: boolean;
  vaults: Vault[]
}

export const VaultsContext = createContext<VaultContextType | undefined>(undefined)