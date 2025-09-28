import { Bolt, Briefcase, Eye, EyeOff, Lock, Mail, UserRound, X } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

import { useState } from "react"

import { Vault } from "@/contexts/vaults/vaultsContext"
import { useVaults } from "@/contexts/hooks/useVaults"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface VaultDataInterface {
  vaultData: Vault,
  passphrase?: string
}

const schema = z.object({
  email: z.string().optional(),
  service_name: z.string().nonempty(),
  username: z.string().optional(),
  password: z.string().nonempty(),
  passphrase: z.string().nonempty(),
})

type Schema = z.infer<typeof schema>

export const VaultConfigDialog = ({ vaultData }: VaultDataInterface) => {
  const { deleteVault, updateVault } = useVaults()

  const [showPasswordDialog, setShowPasswordDialog] = useState<'password' | 'text'>('password')

  const handleShowPasswordDialog = () => {
    return showPasswordDialog === 'password' ? setShowPasswordDialog('text') : setShowPasswordDialog('password')
  }

  const handleDeleteVault = (vaultId: string) => {
    deleteVault(vaultId)
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (vaultData: Schema, vaultId: string) => {
    updateVault(vaultData, vaultId)
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
            You can update and see details about your saved access
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((formData) => onSubmit(formData, vaultData.id))}
          className="flex flex-col gap-2 mt-4">

          <div>
            <Label className="text-black/40" htmlFor="email">
              <Mail className="size-4" />Email: (optional)
            </Label>
            <Input
              {...register('email')}
              className="h-12 mt-2"
              id="email"
              placeholder="Insert your email"
              defaultValue={vaultData?.email} />
            {errors.email && <span className="text-red-700 text-sm">{errors.email.message}</span>}
          </div>

          <div>
            <Label className="text-black/40 mt-2" htmlFor="username">
              <UserRound className="size-4" /> Username: (optional)
            </Label>
            <Input
              {...register('username')}
              className="h-12 mt-2"
              id="username"
              placeholder="Insert your username"
              defaultValue={vaultData?.username} />
            {errors.username && <span className="text-red-700 text-sm">{errors.username.message}</span>}
          </div>

          <div>
            <Label className="text-black/40 mt-2" htmlFor="service_name">
              <Briefcase className="size-4" />Service name:
            </Label>
            <Input
              {...register('service_name')}
              className="h-12 mt-2"
              id="service_name"
              placeholder="Insert your service name"
              defaultValue={vaultData?.service_name} />
            {errors.service_name && <span className="text-red-700 text-sm">{errors.service_name.message}</span>}
          </div>

          <div>
            <Label className="text-black/40 mt-2" htmlFor="password">
              <Lock className="size-4" /> Password:
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                autoComplete="off"
                {...register('password')}
                type={showPasswordDialog}
                className="h-12"
                id="password"
                placeholder="Insert your password"
                defaultValue={vaultData.password} />
              <Button
                onClick={handleShowPasswordDialog}
                type="button"
                className="h-12 w-12 bg-denim-50 shadow-none hover:bg-denim-100 cursor-pointer">
                {showPasswordDialog === "password" ? (
                  <EyeOff className="text-denim-900" />
                ) : (
                  <Eye className="text-denim-900" />
                )}
              </Button>
            </div>
            {errors.password && <span className="text-red-700 text-sm">{errors.password.message}</span>}
          </div>

          <div className="flex gap-2 mt-4">
            <Button className="h-10 w-6/12 bg-denim-800 cursor-pointer hover:bg-denim-700">Edit</Button>
            <Button type="button" onClick={() => handleDeleteVault(vaultData.id)} variant="ghost" className="h-10 w-6/12 cursor-pointer text-red-800 hover:bg-red-800/10 hover:text-red-800">Delete</Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}