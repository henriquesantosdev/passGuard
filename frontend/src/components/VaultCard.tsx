import { Bolt, Copy, Eye, EyeOff, Lock, Mail, ShieldCheck, UserRound } from "lucide-react"

import { Button } from "./ui/button"

import { Bounce, toast } from 'react-toastify'

import { Vault } from "@/contexts/vaults/vaultsContext"
import { useState } from "react"
import { VaultConfigDialog } from "./VaultConfigDialog"
import { CardDecryptPassword } from "./CardDecryptPassword"

interface VaultDataInterface {
  vaultData: Vault
}

export const VaultCard = ({ vaultData }: VaultDataInterface) => {

  const [showPassword, setShowPassword] = useState(false)
  const [encrypted, setEncrypted] = useState(true)

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

          {encrypted ? (
            <div className="hover:cursor-not-allowed ">
              <Button disabled onClick={handleShowPassword} className="bg-denim-50 me-2 hover:bg-denim-100">
                <Bolt className="text-denim-900 size-4" />
              </Button>
            </div>
          ) : (
            <VaultConfigDialog vaultData={vaultData} />
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

        <div className="mt-2 flex text-denim-900 items-center justify-between w-full gap-2 border border-denim-100 rounded-md p-2">
          <div className="flex items-center gap-2 text-ellipsis">
            <Lock className="size-4" />
            {encrypted ? (
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
            {encrypted ? (
              <CardDecryptPassword setEncrypted={setEncrypted} vaultData={vaultData}>
                <Button onClick={handleShowPassword} className="text-denim-900 bg-denim-50 me-2 hover:bg-denim-100 cursor-pointer">
                  <Lock />
                  Decrypt
                </Button>
              </CardDecryptPassword>
            ) : (
              <Button onClick={handleShowPassword} className="bg-denim-50 me-2 hover:bg-denim-100 cursor-pointer">
                {showPassword ? (
                  <Eye className="text-denim-900" />
                ) : (
                  <EyeOff className="text-denim-900" />
                )}
              </Button>
            )}
            <Button disabled={encrypted} onClick={() => handleCopyToClipBoard(vaultData.password)} className="bg-denim-50 hover:bg-denim-100 cursor-pointer">
              <Copy className="text-denim-900" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}