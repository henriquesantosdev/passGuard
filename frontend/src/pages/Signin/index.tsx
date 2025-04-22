import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import passguarLogo from '/passguard-logo.png'
import vaultSvg from '/vault.svg'
import { Link } from "react-router-dom"
import { Eye, EyeOff, LoaderCircle, Lock, LogIn, Mail } from "lucide-react"
import { useEffect, useState } from "react"

import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth } from "@/contexts/hooks/useAuth"
import { ToastContainer } from "react-toastify"

const shortPassword = z.string().trim().min(6, { message: "Password is too short" });

const schema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty().pipe(shortPassword),
})

type Schema = z.infer<typeof schema>

export const Signin = () => {

  const { verifySignedUser } = useAuth()

  useEffect(() => {
    verifySignedUser()
  }, [verifySignedUser])

  const { signIn, loading } = useAuth()
  const [showPassword, setShowPassword] = useState<'password' | 'text'>('password')

  const handleShowPassword = (): void => {
    if (showPassword === 'password') {
      setShowPassword('text')
    } else {
      setShowPassword('password')
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: Schema) => {
    signIn(data.email, data.password)
  }

  return (
    <main className="bg-arapawa-900 h-screen flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white p-6 md:w-[1000px] gap-6 items-center rounded-md flex">
        <form className="w-full md:w-6/12" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="text-3xl text-[#6BBCFF] font-bold flex gap-2 mb-4"><img className="w-[40px]" src={passguarLogo} alt="" /> passGuard</h3>
            <p className="text-arapawa-950 text-xl font-normal">Gerencie suas senhas com segurança e praticidade</p>
          </div>

          <div className="mt-6">
            <div className="relative mb-1">
              <Input
                {...register('email')}
                placeholder="Enter your email"
                type="text"
                className="text-arapawa-950 h-12 border-arapawa-200 pl-10 w-full"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-arapawa-500" size={20} />
            </div>
            {errors.email && <span className="text-red-700 text-sm">* {errors.email.message}</span>}
          </div>

          <div className="mt-4 mb-4">
            <div className="flex gap-2 items-center mb-1">
              <div className="relative w-full">
                <Input
                  {...register('password')}
                  placeholder="Enter your password"
                  type={showPassword}
                  className="text-arapawa-950 h-12 border-arapawa-200 pl-10 w-full"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-arapawa-500" size={20} />
              </div>
              <Button
                type="button"
                onClick={handleShowPassword}
                className="bg-denim-50 hover:bg-denim-100 cursor-pointer p-2 rounded"
              >{showPassword === 'password' ? (
                <Eye className="text-denim-900 size-5" />
              ) : (
                <EyeOff className="text-denim-900 size-5" />
              )}</Button>
            </div>
            {errors.password && <span className="text-red-700 text-sm">* {errors.password.message}</span>}
          </div>

          <span className="text-gray-500">Are you a new user? <Link to="/signup"
            className="text-[#2F78E1] underline hover:text-arapawa-700">
            Create an account
          </Link>
          </span>

          <Button disabled={loading} type="submit" className="w-full mt-6 h-12 text-lg cursor-pointer bg-[#2F78E1] hover:bg-arapawa-900 drop-shadow-lg shadow-[#2F78E1]/50">
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <LogIn />
                Signup
              </>
            )}
          </Button>

        </form>
        <div className="hidden md:w-6/12 md:block">
          <img src={vaultSvg} alt="" />
        </div>
      </div>
    </main>
  )
}