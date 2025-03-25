import { use } from "react";
import { VaultContextType, VaultsContext } from "../vaults/vaultsContext";

export const useVaults = (): VaultContextType => {
  const context = use(VaultsContext)
  
  if (!context) {
    throw new Error('useVaults need used on AuthProvider')
  }

  return context;
}