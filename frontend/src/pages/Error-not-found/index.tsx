import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const ErrorNotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl mb-2">404</h1>
      <h2 className="text-4xl">Page not found</h2>
      <Button className="mt-4 cursor-pointer" asChild>
        <Link to='/' replace={true}>
          Return to initial page
        </Link>
      </Button>
    </div>
  )
}