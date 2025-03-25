import { EyeOff, X } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { ReactElement } from "react"

interface CardCreateVaultProps {
  children: ReactElement
}

export const CardCreateVault = ({ children }: CardCreateVaultProps) => {
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

        <form className="flex flex-col gap-2">
          <Input className="h-12" placeholder="Email (optional)" />
          <Input className="h-12" placeholder="Username (optional)" />
          <div className="flex items-center gap-2">
            <Input className="h-12" placeholder="password" />
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
  )
}