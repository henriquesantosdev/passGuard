import { api } from "@/api/axios"
import { CreateVaultType, Vault, VaultsContext } from "./vaultsContext"
import { ReactNode, useCallback, useState } from "react"

interface VaultsProviderProps {
  children: ReactNode
}

const VaultsProvider = ({ children }: VaultsProviderProps) => {
  const [vaults, setVaults] = useState<Vault[] | []>([])
  const [loading, setLoading] = useState(false)

  const getVaults = useCallback(() => {
    setLoading(true);

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

  }, []);

  const createVault = useCallback((data: CreateVaultType) => {
    setLoading(true)

    api.post('/vaults', {
      email: data.email,
      password: data.password,
      username: data.username,
      service_name: data.service_name
    }).then((response) => {
      console.log(response)
      setVaults([...vaults, response.data.vault])
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })

  }, [vaults])

  const deleteVault = (vaultId: string) => {
    setLoading(true)

    
    api.delete(`vaults/${vaultId}`)
    .then(() => {
      const deleted = vaults.filter(vault => vault.id !== vaultId)
      setVaults(deleted)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })

  }

  return (
    <VaultsContext.Provider
      value={{
        getVaults,
        createVault,
        deleteVault,
        loading,
        vaults
      }}>
      {children}
    </VaultsContext.Provider>
  )
}

export default VaultsProvider