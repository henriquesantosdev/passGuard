import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/hooks/useAuth"
import { LoaderCircle, RefreshCw, UserRound } from "lucide-react"
import { ToastContainer } from "react-toastify"

export const Profile = () => {
  const { user, loading } = useAuth()

  return (
    <main>
      {loading ? (
        <div className="text-denim-950 gap-2 h-screen flex items-center justify-center">
          <LoaderCircle className="size-8 animate-spin" />
          <h2 className="text-2xl">Loading...</h2>
        </div>
      ) : (
        <div className="bg-arapawa-50 min-h-screen justify-between flex flex-col">
          <div className="w-full lg:max-w-8/12 mx-auto mt-4">
          <ToastContainer />

            <Header />

            <div className="flex flex-col bg-denim-600 items-center justify-center gap-4 mt-6 pt-8 pb-28 rounded-md">
              <Avatar className="w-40 h-40 border-4">
                <AvatarImage src="https://github.com/shadcn.png" alt="user image" />
                <AvatarFallback className="bg-denim-50">
                  <UserRound className="text-denim-700" />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-white font-semibold text-xl">{user?.email || ''}</p>
                <p className="text-white font-normal text-sm">Usuario desde: {user?.created_at || ''}</p>
              </div>
            </div>

            <div className="bg-gray-300 mx-auto mt-[-50px] rounded-md max-w-[800px]">
              <form action="" className="w-full rounded-md p-8">
                <Input defaultValue={user?.email || ''} className="h-12 mb-4 bg-white" />
                <Button type="button" className="bg-denim-800 hover:bg-denim-700 cursor-pointer" size="lg">
                  <RefreshCw />
                  Change e-mail
                </Button>
              </form>
            </div>

          </div>

          <Footer/>
        </div>
      )}
    </main >
  )
}