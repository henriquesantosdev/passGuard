import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import passguardLogo from "/passguard-logo.png"
import { LogOut, UserRound } from 'lucide-react'
import { Button } from "./ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const Header = () => {
  return (
    <nav className="bg-denim-700 p-4 rounded-full flex items-center justify-between px-10">
      <div>
        <h3
          className="text-2xl text-denim-100 font-bold flex gap-2">
          <img
            className="w-[35px]"
            src={passguardLogo}
            alt=""
          />
          passGuard
        </h3>
      </div>
      <div className="flex items-center gap-4">

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer border-2 rounded-full border-denim-50">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="user image" />
              <AvatarFallback className="bg-denim-50">
                <UserRound className="text-denim-700" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="cursor-pointer text-white bg-red-900 border-[2px] border-red-800 hover:bg-red-950">
          <LogOut />
          Logout
        </Button>
      </div>
    </nav>
  )
}