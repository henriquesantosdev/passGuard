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
  createVault: (data: CreateVaultType, passphrase: string) => void;
  deleteVault: (vaultId: string) => void;
  updateVault: (vaultData: UpdateVaultType, vaultId: string) => void;
  getVaultsInfo: () => void;
  vaultsInfo: VaultsInfo | undefined;
  loading: boolean;
  getVaultsInfoLoading: boolean;
  vaults: Vault[];
}

export type CreateVaultType = {
  service_name: string;
  email?: string;
  username?: string;
  password: string;
}

export type UpdateVaultType = {
  service_name: string;
  email?: string;
  username?: string;
  password: string;
  passphrase: string;
}

export type VaultsInfo = {
  savedVaults: number;
  strong: number;
  weak: number;
  duplicated: number
}

export const VaultsContext = createContext<VaultContextType | undefined>(undefined)