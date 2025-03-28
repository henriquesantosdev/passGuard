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
  createVault: (data: CreateVaultType) => void;
  deleteVault: (vaultId: string) => void,
  updateVault: (vaultData: UpdateVaultType, vaultId: string) => void
  loading: boolean;
  vaults: Vault[]
}

export type CreateVaultType = {
  service_name: string,
  email?: string,
  username?: string,
  password: string
}

export type UpdateVaultType = {
  service_name: string,
  email?: string,
  username?: string,
  password: string
}

export const VaultsContext = createContext<VaultContextType | undefined>(undefined)