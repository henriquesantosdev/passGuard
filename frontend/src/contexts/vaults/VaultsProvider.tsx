import { api } from "@/api/axios"
import { CreateVaultType, UpdateVaultType, Vault, VaultsContext, VaultsInfo } from "./vaultsContext"
import { ReactNode, useCallback, useState } from "react"
import { checkPasswordStrength } from "@/utils/checkPasswordStrength"

interface VaultsProviderProps {
  children: ReactNode
}

const VaultsProvider = ({ children }: VaultsProviderProps) => {
  const [vaults, setVaults] = useState<Vault[] | []>([])
  const [vaultsInfo, setVaultsInfo] = useState<VaultsInfo | undefined>(undefined)
  const [getVaultsInfoLoading, setGetVaultsInfoLoading] = useState(false)
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

  const getVaultsInfo = useCallback(() => {
    setGetVaultsInfoLoading(true)

    const vaultsPasswordInfo = {
      savedVaults: 0,
      strong: 0,
      weak: 0,
      duplicated: 0
    }

    const passwordsChecked = new Set<string>()
    
    vaults.forEach(vault => {
      vaultsPasswordInfo.savedVaults++
      const passwordStrength = checkPasswordStrength(vault.password)

      if (passwordStrength === 'strong') {
        vaultsPasswordInfo.strong++
      } else {
        vaultsPasswordInfo.weak++
      }

      if (!passwordsChecked.has(vault.password)) {
        passwordsChecked.add(vault.password)
      }

    })

    vaultsPasswordInfo.duplicated = vaults.length - Array.from(passwordsChecked).length

    setVaultsInfo(vaultsPasswordInfo)
    setGetVaultsInfoLoading(false)
  }, [vaults])

  return (
    <VaultsContext.Provider
      value={{
        getVaults,
        createVault,
        deleteVault,
        updateVault,
        getVaultsInfo,
        vaultsInfo,
        getVaultsInfoLoading,
        loading,
        vaults
      }}>
      {children}
    </VaultsContext.Provider>
  )
}

export default VaultsProvider