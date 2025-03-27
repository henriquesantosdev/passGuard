import { Bolt, EyeOff, X } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useState } from "react"
import { Vault } from "@/contexts/vaults/vaultsContext"
import { useVaults } from "@/contexts/hooks/useVaults"

interface VaultDataInterface {
  vaultData: Vault
}

export const CardPasswordDialog = ({ vaultData }: VaultDataInterface) => {
  const { deleteVault } = useVaults()

  const [showPasswordDialog, setShowPasswordDialog] = useState<'password' | 'text'>('password')

  const handleShowPasswordDialog = () => {
    return showPasswordDialog === 'password' ? setShowPasswordDialog('text') : setShowPasswordDialog('password')
  }

  const handleDeleteVault = (vaultId: string) => {
    deleteVault(vaultId)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-denim-50 hover:bg-denim-100 cursor-pointer p-2 rounded">
          <Bolt className="text-denim-900 size-4" />
        </div>
      </DialogTrigger>
      <DialogContent>

        <DialogHeader>
          <DialogTitle className="text-denim-950 flex justify-between items-center">
            {vaultData.service_name}
            <DialogClose asChild>
              <Button className="bg-white shadow-none hover:bg-denim-100 cursor-pointer">
                <X className="text-denim-900" />
              </Button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            You can see more about your saved access from the service
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-2 mt-4">
          <Label className="text-black/40" htmlFor="email">Email: (optional)</Label>
          <Input className="h-12" id="email" placeholder="Email" defaultValue={vaultData?.email} />

          <Label className="text-black/40 mt-2" htmlFor="username">Username: (optional)</Label>
          <Input className="h-12" id="username" placeholder="Username" defaultValue={vaultData?.username} />

          <Label className="text-black/40 mt-2" htmlFor="service_name">Service name:</Label>
          <Input className="h-12" id="service_name" placeholder="Service Name" defaultValue={vaultData?.service_name} />

          <Label className="text-black/40 mt-2" htmlFor="password">Password:</Label>
          <div className="flex items-center gap-2">
            <Input type={showPasswordDialog} className="h-12" id="password" placeholder="password" defaultValue={vaultData.password} />
            <Button onClick={handleShowPasswordDialog} type="button" className="h-12 w-12 bg-white shadow-none hover:bg-denim-100 cursor-pointer">
              <EyeOff className="text-denim-900" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button className="h-10 w-6/12 bg-denim-800 cursor-pointer hover:bg-denim-700">Edit</Button>
            <Button type="button" onClick={() => handleDeleteVault(vaultData.id)} variant="ghost" className="h-10 w-6/12 cursor-pointer text-red-800 hover:bg-red-800/10 hover:text-red-800">Delete</Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}