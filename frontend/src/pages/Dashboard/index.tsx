import { CardCreateVault } from "@/components/CardCreateVault"
import { VaultCard } from "@/components/VaultCard"
import { DetailsBarPassword } from "@/components/DetailsBarPassword"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useVaults } from "@/contexts/hooks/useVaults"
import { KeyRound, Lock, Package, Plus, Shield } from "lucide-react"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { CardDecryptVaults } from "@/components/CardDecryptVaults"
import { useAuth } from "@/contexts/hooks/useAuth"

export const Dashboard = () => {
  const { getVaults, loading, vaults, showPasswordStatus } = useVaults()
  const { user } = useAuth()

  useEffect(() => {
    getVaults()
  }, [getVaults])

  return (
    <div className="bg-arapawa-50 min-h-screen p-4">
      <ToastContainer />
      <div className="w-full lg:max-w-8/12 mx-auto">
        <Header />

        {(showPasswordStatus) ?
          (
            <DetailsBarPassword />
          ) :
          (
            <div className="bg-red-200 mt-6 p-6 text-xl text-red-900 font-semibold flex gap-3 items-center rounded-md">
              <Lock className="size-7 text-red-900" />
              Decrypt your vaults to view the strength statistics.
            </div>
          )}

        <div className="mt-6 bg-denim-900 p-6 rounded-md">
          <div className="text-2xl font-bold text-white mb-6 flex items-center justify-between">

            <div className="flex gap-2 items-center">
              <Shield className="size-8 text-white" />
              My Vaults
            </div>

            {vaults.length > 0 && (
              <div className="flex gap-2">
                <CardDecryptVaults passphrase={user?.passphrase}>
                  <Button className="bg-white text-denim-900 hover:cursor-pointer hover:bg-white/90 hover:text-denim-900">
                    <KeyRound /> Decrypt vaults
                  </Button>
                </CardDecryptVaults>

                <CardCreateVault>
                  <Button className="bg-white text-denim-900 hover:cursor-pointer hover:bg-white/90 hover:text-denim-900">
                    <Package /> Storage a new password
                  </Button>
                </CardCreateVault>
              </div>
            )}

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <>
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
              </>
            ) : (
              <>
                {vaults.length > 0
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
      </div>
    </div >
  )
}