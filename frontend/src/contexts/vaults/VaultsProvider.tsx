import { api } from "@/api/axios"
import { CreateVaultType, UpdateVaultType, Vault, VaultsContext } from "./vaultsContext"
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

  const updateVault = (vaultData: UpdateVaultType, vaultId: string) => {
    setLoading(true)
    
    api.put(`vaults/${vaultId}`, {
      email: vaultData.email,
      password: vaultData.password,
      username: vaultData.username,
      service_name: vaultData.service_name
    }).then((response) => {
      const updated = vaults.filter((vault) => vault.id !== vaultId)
      setVaults([response.data.vault, ...updated])
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
        updateVault,
        loading,
        vaults
      }}>
      {children}
    </VaultsContext.Provider>
  )
}

export default VaultsProvider