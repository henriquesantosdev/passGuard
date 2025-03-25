import { api } from "@/api/axios"
import { Vault, VaultsContext } from "./vaultsContext"
import { ReactNode, useCallback, useState } from "react"

interface VaultsProviderProps {
  children: ReactNode
}

const VaultsProvider = ({ children }: VaultsProviderProps) => {
  const [vaults, setVaults] = useState<Vault[] | []>([])
  const [loading, setLoading] = useState(false)

  const getVaults = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      api.get("/vaults")
        .then((response) => {
          setVaults(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000)
    
  }, []);

  return (
    <VaultsContext.Provider
      value={{
        getVaults,
        loading,
        vaults
      }}>
      {children}
    </VaultsContext.Provider>
  )
}

export default VaultsProvider