import { CardCreateVault } from "@/components/CardCreateVault"
import { VaultCard } from "@/components/CardPassword"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useVaults } from "@/contexts/hooks/useVaults"
import { Plus, Vault } from "lucide-react"
import { useEffect } from "react"

export const Dashboard = () => {
  const { getVaults, loading, vaults } = useVaults()

  useEffect(() => {
    getVaults()
  }, [getVaults])

  console.log(vaults)

  return (
    <main className="bg-arapawa-50 h-screen">
      <div className="max-w-8/12 mx-auto pt-4">
        <Header />
        <div className="mt-16 bg-denim-900 p-6 rounded-md">

          <h1 className="text-2xl font-bold text-white mb-4 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Vault className="size-8 text-white" />
              My Vault
            </div>
            {vaults && (
              <CardCreateVault>
                <Button className="bg-white text-denim-900 hover:cursor-pointer hover:bg-white/90 hover:text-denim-900"><Plus />Storage a new password</Button>
              </CardCreateVault>
            )}
          </h1>

          <div className="grid grid-cols-2 gap-4">
            {loading ? (
              <>
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
              </>
            ) : (
              <>
                {vaults
                  ?
                  vaults.map((vault) => <VaultCard key={vault.id} vaultData={vault} />)
                  :
                  <CardCreateVault>
                    <div className="w-full h-32 bg-none border-2 rounded-md flex items-center justify-center gap-2 font-semibold text-white hover:cursor-pointer hover:bg-white/20">
                      <Plus className="size-8" />
                      Storage a new password
                    </div>
                  </CardCreateVault>
                }
              </>
            )}
          </div>

        </div>

        <div className="bg-denim-700 rounded-md mt-4">
          <h2 className="text-2xl font-bold text-denim-50 p-4">Gerador de senhas</h2>
        </div>
      </div>
    </main>
  )
}