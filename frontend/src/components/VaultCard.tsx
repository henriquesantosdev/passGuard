import { Bolt, Copy, Eye, EyeOff, Lock, LockOpen, Mail, ShieldCheck, Trash2, UserRound } from "lucide-react"

import { Button } from "./ui/button"

import { Bounce, toast } from 'react-toastify'

import { Vault } from "@/contexts/vaults/vaultsContext"
import { useState } from "react"
import { VaultConfigDialog } from "./VaultConfigDialog"
import { useVaults } from "@/contexts/hooks/useVaults"
import { useAuth } from "@/contexts/hooks/useAuth"
import { CardDecryptVault } from "./CardDecryptVault"

interface VaultDataInterface {
  vaultData: Vault
}

export const VaultCard = ({ vaultData }: VaultDataInterface) => {
  const { deleteVault } = useVaults()
  const { user } = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  const handleCopyToClipBoard = (password: string) => {
    navigator.clipboard.writeText(password)

    toast.success('password copied to clipboard!', {
      position: "top-right",
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

  const handleDeleteVault = (vaultId: string) => {
    deleteVault(vaultId)
  }

  return (
    <div className="bg-white flex gap-4 p-4 rounded-md">
      <div className="flex h-[80px]">
        <ShieldCheck className="size-10 text-denim-900" />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-denim-900 text-2xl font-bold">{vaultData.service_name}</p>

          {vaultData.encrypted ? (
            <div className="hover:cursor-not-allowed ">
              <Button disabled onClick={handleShowPassword} className="bg-denim-50 me-2 hover:bg-denim-100">
                <Bolt className="text-denim-900 size-4" />
              </Button>

              <Button onClick={() => handleDeleteVault(vaultData.id)} className="cursor-pointer text-red-800 bg-red-800/10 hover:bg-red-800/20 hover:text-red-800 me-2">
                <Trash2 className="size-4" />
              </Button>

              <CardDecryptVault passphrase={user?.passphrase} vaultId={vaultData.id}>
                <Button className="cursor-pointer text-denim-800 bg-denim-800/10 hover:bg-denim-800/20 hover:text-denim-800">
                  <LockOpen className="size-4" />
                </Button>
              </CardDecryptVault>
            </div>
          ) : (
            <VaultConfigDialog passphrase={user?.passphrase} vaultData={vaultData} />
          )}

        </div>

        <div className="flex items-center mt-2 gap-2 text-denim-900">
          <Mail className="size-4" />
          <p className="text-denim-900">{vaultData?.email == "" ? 'Email not defined' : vaultData?.email}</p>
        </div>
        <div className="flex items-center gap-2 text-denim-900">
          <UserRound className="size-4" />
          <p>{vaultData?.username == "" ? 'Username not defined' : vaultData?.username}</p>
        </div>

        <div className="mt-3 mb-4">

          {(vaultData?.passwordStrength === 'strong') && (
            <span className="bg-green-200/50 text-green-700 p-1 px-4 rounded-full mt-2">
              Strong password
            </span>
          )}

          {(vaultData?.passwordStrength === 'weak') && (
            <span className="bg-red-100/50 text-red-700 p-1 px-4 rounded-full mt-2">
              Weak password
            </span>
          )}
        </div>

        <div className="mt-2 flex text-denim-900 items-center justify-between w-full gap-2 border border-denim-100 rounded-md p-2">
          <div className="flex items-center gap-2 text-ellipsis">
            <Lock className="size-4" />
            {vaultData.encrypted ? (
              <p>Password encrypted</p>
            ) : (
              showPassword ? (
                <p>{vaultData.password}</p>
              ) : (
                <p>**************</p>
              )
            )}
          </div>

          <div>
            <Button disabled={vaultData.encrypted} onClick={handleShowPassword} className="bg-denim-50 me-2 hover:bg-denim-100 cursor-pointer">
              {showPassword ? (
                <Eye className="text-denim-900" />
              ) : (
                <EyeOff className="text-denim-900" />
              )}
            </Button>
            <Button disabled={vaultData.encrypted} onClick={() => handleCopyToClipBoard(vaultData.password)} className="bg-denim-50 hover:bg-denim-100 cursor-pointer">
              <Copy className="text-denim-900" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}