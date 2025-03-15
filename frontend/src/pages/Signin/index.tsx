import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import passguarLogo from '/passguard-logo.png'
import vaultSvg from '/vault.svg'
import { Link } from "react-router-dom"

export const Signin = () => {
  return (
    <main className="bg-arapawa-900 h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 md:w-[1000px] gap-6 items-center rounded-md flex">
        <form className="w-full md:w-6/12">
          <div>
            <h3 className="text-3xl text-[#6BBCFF] font-bold flex gap-2 mb-4"><img className="w-[40px]" src={passguarLogo} alt="" /> passGuard</h3>
            <p className="text-arapawa-950 text-xl font-normal">Gerencie suas senhas com segurança e praticidade</p>
          </div>

          <div className="mt-6">
            <Label
              className="text-arapawa-950 mb-2 text-md font-normal">
              Email
              <span className="text-red-600">*</span>
            </Label>
            <Input
              type="email"
              className="text-arapawa-950 h-12 border-arapawa-200"
            />
          </div>

          <div className="mt-4 mb-2">
            <Label
              className="text-arapawa-950 mb-2 text-md font-normal">
              Password
              <span className="text-red-600">*</span>
            </Label>
            <Input
              type="password"
              className="text-arapawa-950 border-arapawa-200 h-12"
            />
          </div>
          <span>
            <Link
              to="/signup"
              className="text-arapawa-900 underline hover:text-arapawa-700">
              Create an account
            </Link>
          </span>

          <Button
            className="w-full mt-4 h-12 text-lg cursor-pointer bg-arapawa-950 hover:bg-arapawa-900">
            Signin
          </Button>

        </form>
        <div className="hidden md:w-6/12 md:block">
          <img src={vaultSvg} alt="" />
        </div>
      </div>
    </main>
  )
}