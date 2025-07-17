import { ReactNode } from "react"

interface FooterIconSquareInterface {
  children: ReactNode;
  href: string
}

export const FooterIconSquare = ({ children, href }: FooterIconSquareInterface) => {
  return (
    <a href={href} target="_blank" className="bg-denim-800 flex gap-2 items-center hover:bg-denim-900 p-1 px-3 rounded text-white font-semibold">
      {children}
    </a>
  )
}