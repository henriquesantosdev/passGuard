import { api } from "@/api/axios"
import { CreateVaultType, UpdateVaultType, Vault, VaultsContext, VaultsInfo } from "./vaultsContext"
import { ReactNode, useCallback, useState } from "react"
import { checkPasswordStrength } from "@/utils/checkPasswordStrength"
import { decryptPassword, encryptPassword } from "@/utils/crypto"
import { verifyPassphrase } from "@/utils/verifyPassphrase"

interface VaultsProviderProps {
  children: ReactNode
}

const VaultsProvider = ({ children }: VaultsProviderProps) => {
  const [vaults, setVaults] = useState<Vault[] | []>([])
  const [vaultsInfo, setVaultsInfo] = useState<VaultsInfo | undefined>(undefined)
  const [getVaultsInfoLoading, setGetVaultsInfoLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [encrypted, setEncrypted] = useState(true)

  const getVaults = useCallback(() => {
    setLoading(true);

    api.get("/vaults")
      .then((response) => {
        response.data.map(async (vault: Vault) => {
          vault.encrypted = true
        });
        setVaults(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const createVault = useCallback(async (data: CreateVaultType, passphrase: string) => {
    setLoading(true)

    data.password = await encryptPassword(data.password, passphrase)

    api.post('/vaults', {
      email: data.email,
      password: data.password,
      username: data.username,
      service_name: data.service_name
    }).then((response) => {
      response.data.vault.encrypted = true
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

  const updateVault = async (vaultData: UpdateVaultType, vaultId: string) => {
    setLoading(true)

    const encryptedPassword = await encryptPassword(vaultData.password, vaultData.passphrase)

    api.put(`vaults/${vaultId}`, {
      email: vaultData.email,
      password: encryptedPassword,
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

  const decryptVaults = async (passphraseEncrypted: string, passphrase: string) => {

    try {
      const passphraseVeify = await verifyPassphrase(passphraseEncrypted, passphrase)

      if (!passphraseVeify) return

      const decryptedVaults = await Promise.all(vaults.map(async vault => {
        
        if (vault.encrypted === false) {
          console.log('false -> passou por', vault)
          return vault
        }
        
        const decryptedPassword = await decryptPassword(vault.password, passphrase)
        console.log('true -> passou por', vault)
        return {
          ...vault,
          password: decryptedPassword,
          encrypted: false
        }
      }));

      setVaults(decryptedVaults)
      setEncrypted(false)
    } catch (error) {
      console.log('Decrypt vaults')
      console.log(error)
    }
  }

  const decryptVault = async (vaultId: string, passphrase: string) => {
    try {
      const newVaults = await Promise.all(vaults.map(async vault => {
        if (vault.id === vaultId) {
          const decryptedPassword = await decryptPassword(vault.password, passphrase)

          return {
            ...vault,
            password: decryptedPassword,
            encrypted: false
          }
        } else {
          return vault
        }
      }))

      console.log(newVaults)
      setVaults(newVaults)
    } catch (error) {
      console.log('Decrypt vault')
      console.log(error)
    }
  }

  return (
    <VaultsContext.Provider
      value={{
        getVaults,
        createVault,
        deleteVault,
        updateVault,
        getVaultsInfo,
        decryptVaults,
        decryptVault,
        vaultsInfo,
        encrypted,
        getVaultsInfoLoading,
        loading,
        vaults
      }}>
      {children}
    </VaultsContext.Provider>
  )
}

export default VaultsProvider