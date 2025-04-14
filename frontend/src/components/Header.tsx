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
import { useAuth } from "@/contexts/hooks/useAuth"

export const Header = () => {

  const { signOut } = useAuth()

  return (
    <nav className="bg-denim-700 p-4 rounded-md flex items-center justify-between px-10">
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
            <DropdownMenuItem className="cursor-pointer">
              <a href='/profile'>
                Profile
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={signOut} className="cursor-pointer text-white bg-red-900 border-[2px] border-red-800 hover:bg-red-950">
          <LogOut />
          Logout
        </Button>
      </div>
    </nav>
  )
}