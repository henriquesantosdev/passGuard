import { Briefcase, Eye, EyeOff, Lock, Mail, UserRound, X } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { ReactElement, useState } from "react"

import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useVaults } from "@/contexts/hooks/useVaults"
import { Label } from "./ui/label"

interface CardCreateVaultProps {
  children: ReactElement
}

const schema = z.object({
  email: z.string().optional(),
  service_name: z.string().nonempty(),
  username: z.string().optional(),
  password: z.string().nonempty(),
})

type Schema = z.infer<typeof schema>

export const CardCreateVault = ({ children }: CardCreateVaultProps) => {

  const { createVault } = useVaults()

  const [showPassword, setShowPassword] = useState<'password' | 'text'>('password')

  const handleShowPassword = () => {
    if (showPassword === 'password') {
      setShowPassword('text')
    } else {
      setShowPassword('password')
    }
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: Schema) => {
    createVault(data)
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
            Storage a new password
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">

          <div>
            <Label className="text-black/40" htmlFor="email">
              <Mail className="size-4" />Email: (optional)
            </Label>
            <Input
              {...register('email')}
              className="h-12 mt-2"
              id="email"
              placeholder="Insert your email"/>
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
              placeholder="Insert your username" />
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
              placeholder="Service Name" />
            {errors.service_name && <span className="text-red-700 text-sm">{errors.service_name.message}</span>}
          </div>

          <div>
            <Label className="text-black/40 mt-2" htmlFor="password">
              <Lock className="size-4" /> Password:
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                {...register('password')}
                type={showPassword}
                className="h-12"
                id="password"
                placeholder="password" />
              <Button
                onClick={handleShowPassword}
                type="button"
                className="h-12 w-12 bg-denim-50 shadow-none hover:bg-denim-100 cursor-pointer">
                {showPassword === "password" ? (
                  <EyeOff className="text-denim-900" />
                ) : (
                  <Eye className="text-denim-900" />
                )}
              </Button>
            </div>
            {errors.password && <span className="text-red-700 text-sm">{errors.password.message}</span>}
          </div>

          <div className="flex gap-2">
            <Button className="h-10 w-full bg-denim-800 cursor-pointer hover:bg-denim-700">Add password</Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}