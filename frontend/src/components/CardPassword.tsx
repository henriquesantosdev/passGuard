import { Bolt, Copy, Eye, EyeOff, Lock, Mail, ShieldCheck, UserRound, X } from "lucide-react"

import { Button } from "./ui/button"

import { Bounce, toast } from 'react-toastify'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Vault } from "@/contexts/vaults/vaultsContext"
import { useState } from "react"

interface VaultDataInterface {
  vaultData: Vault
}

export const VaultCard = ({ vaultData }: VaultDataInterface) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleCopyToClipBoard = (password: string) => {
    navigator.clipboard.writeText(password)

    toast.success('password copied to clipboard!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const handleShowPassword = () => {
    return showPassword ? setShowPassword(false) : setShowPassword(true)
  }

  return (
    <div className="bg-white flex gap-4 p-4 rounded-md">
      <div className="flex h-[80px]">
        <ShieldCheck className="size-10 text-denim-900" />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-denim-900 text-2xl font-bold">{vaultData.service_name}</p>

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

              <form className="flex flex-col gap-2">
                <Input className="h-12" placeholder="Email" defaultValue={vaultData?.email} />
                <Input className="h-12" placeholder="Username" defaultValue={vaultData?.username} />
                <div className="flex items-center gap-2">
                  <Input className="h-12" placeholder="password" defaultValue={vaultData.password} />
                  <Button type="button" className="h-12 w-12 bg-white shadow-none hover:bg-denim-100 cursor-pointer">
                    <EyeOff className="text-denim-900" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button className="h-10 w-6/12 bg-denim-800 cursor-pointer hover:bg-denim-700">Edit</Button>
                  <Button variant="ghost" className="h-10 w-6/12 cursor-pointer text-red-800 hover:bg-red-800/10 hover:text-red-800">Delete</Button>
                </div>
              </form>

            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center mt-2 gap-2 text-denim-900">
          <Mail className="size-4" />
          <p className="text-denim-900">{vaultData?.email == "" ? 'Email not defined' : vaultData?.email}</p>
        </div>
        <div className="flex items-center gap-2 text-denim-900">
          <UserRound className="size-4" />
          <p>{vaultData?.username == "" ? 'Username not defined' : vaultData?.username}</p>
        </div>

        <div className="mt-2 flex text-denim-900 items-center justify-between w-full gap-2 border border-denim-100 rounded-md p-2">
          <div className="flex items-center gap-2">
            <Lock className="size-4" />
            {showPassword ? (
              <p>{vaultData.password}</p>
            ) : (
              <p>********************</p>
            )}
          </div>

          <div>
            <Button onClick={handleShowPassword} className="bg-denim-50 me-2 hover:bg-denim-100 cursor-pointer">
              {showPassword ? (
                <EyeOff className="text-denim-900" />
              ) : (
                <Eye className="text-denim-900" />
              )}
            </Button>
            <Button onClick={() => handleCopyToClipBoard(vaultData.password)} className="bg-denim-50 hover:bg-denim-100 cursor-pointer">
              <Copy className="text-denim-900" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}