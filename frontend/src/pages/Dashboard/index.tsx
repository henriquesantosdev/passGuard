import { CardPassword } from "@/components/CardPassword"
import { Header } from "@/components/Header"
import { Vault } from "lucide-react"

export const Dashboard = () => {
  return (
    <main className="bg-arapawa-50 h-screen">
      <div className="max-w-8/12 mx-auto pt-4">
        <Header />
        <div className="mt-4 bg-denim-900 p-6 rounded-md">

          <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Vault className="size-8 text-white" />
            My Vault
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <CardPassword />
          </div>

        </div>

        <div className="bg-denim-700 rounded-md mt-4">
          <h2 className="text-2xl font-bold text-denim-50 p-4">Gerador de senhas</h2>
        </div>
      </div>
    </main>
  )
}