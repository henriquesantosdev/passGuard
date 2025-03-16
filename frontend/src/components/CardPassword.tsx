import { Bolt, Copy, EyeOff, ShieldCheck, X } from "lucide-react"

import { Button } from "./ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"


export const CardPassword = () => {
  return (
    <div className="bg-white flex gap-4 p-4 rounded-md">
      <div className="flex h-[80px]">
        <ShieldCheck className="size-10 text-denim-900" />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-denim-900 text-2xl font-bold">Service name</p>

          <Dialog>
            <DialogTrigger>
              <Button className="bg-denim-50 hover:bg-denim-100 cursor-pointer">
                <Bolt className="text-denim-900" />
              </Button>
            </DialogTrigger>
            <DialogContent>

              <DialogHeader>
                <DialogTitle className="text-denim-950 flex justify-between items-center">
                  Service name
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
                <Input className="h-12" placeholder="Email" defaultValue={"serviceemail@domain.com"} />
                <Input className="h-12" placeholder="Username" defaultValue={"User Name"} />
                <div className="flex items-center gap-2">
                  <Input className="h-12" placeholder="password" defaultValue={"**************"} />
                  <Button className="h-12 w-12 bg-white shadow-none hover:bg-denim-100 cursor-pointer">
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

        </div>
        <p className="text-denim-900">serviceemail@domain.com</p>
        <div className="text-denim-900 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <p>****************</p>
            <Button className="bg-denim-50 hover:bg-denim-100 cursor-pointer">
              <EyeOff className="text-denim-900" />
            </Button>
            <Button className="bg-denim-50 hover:bg-denim-100 cursor-pointer">
              <Copy className="text-denim-900" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}