import { Eye, EyeOff, KeyRound, Lock, X } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { ReactElement, useState } from "react"

import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "./ui/label"
// import { decryptPassword } from "@/utils/crypto"
import { Bounce, toast } from "react-toastify"
import { useVaults } from "@/contexts/hooks/useVaults"
import { decryptPassword } from "@/utils/crypto"

interface CardCreateVaultProps {
  children: ReactElement,
  passphrase?: string,
  vaultId: string
}

const schema = z.object({
  password: z.string().nonempty(),
  passphrase: z.string().nonempty(),
})

type Schema = z.infer<typeof schema>

export const CardDecryptVault = ({ children, passphrase, vaultId }: CardCreateVaultProps) => {

  const { decryptVault } = useVaults()

  const [showSecureKey, setShowSecureKey] = useState<'password' | 'text'>('password')

  const handleShowSecureKey = () => {
    if (showSecureKey === 'password') {
      setShowSecureKey('text')
    } else {
      setShowSecureKey('password')
    }
  }

  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: { password: string, passphrase: string }) => {
    try {

      const passwordCheck = await decryptPassword(data.password, data.passphrase)

      if (!passwordCheck) {
        return
      }

      decryptVault(vaultId, data.passphrase)

      toast.success('Passwords Decrypted!', {
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
    } catch {
      setError('passphrase', { message: 'Wrong passphrase' })
    }
  }

  const handleMoreInfoReset = () => {
    reset()
  }

  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>

        <DialogHeader>
          <DialogTitle className="text-denim-950 flex justify-between items-center">
            Decrypt the storage password
            <DialogClose asChild>
              <Button onClick={handleMoreInfoReset} className="bg-white shadow-none hover:bg-denim-100 cursor-pointer">
                <X className="text-denim-900" />
              </Button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            Use the passphrase to decrypt the storage password
          </DialogDescription>
        </DialogHeader>


        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

          <div>
            <Label className="text-black/40 mt-2" htmlFor="password">
              <Lock className="size-4" /> Encrypted password:
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                autoComplete="off"
                {...register('password')}
                className="h-12"
                id="password"
                placeholder="password"
                defaultValue={passphrase}
                disabled
              />
            </div>
          </div>

          <div>
            <Label className="text-black/40 mt-2" htmlFor="passphrase">
              <KeyRound className="size-4" /> Secret Passphrase:
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                {...register('passphrase')}
                type={showSecureKey}
                className="h-12"
                id="passphrase"
                placeholder="Your secure text" />
              <Button
                onClick={handleShowSecureKey}
                type="button"
                className="h-12 w-12 bg-denim-50 shadow-none hover:bg-denim-100 cursor-pointer">
                {showSecureKey === "password" ? (
                  <EyeOff className="text-denim-900" />
                ) : (
                  <Eye className="text-denim-900" />
                )}
              </Button>
            </div>
            {errors.passphrase && <span className="text-red-700 text-sm">{errors.passphrase.message}</span>}
          </div>

          <div className="flex gap-2 mt-4">
            <Button className="h-10 w-full bg-denim-800 cursor-pointer hover:bg-denim-700">Decrypt password</Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}