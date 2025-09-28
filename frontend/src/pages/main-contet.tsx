import { ComponentProps } from "react"

interface MainContentProps extends ComponentProps<'main'> {
  children: React.ReactNode
}

export default function MainContent({children, className, ...props}: MainContentProps) {
  return (
    <main className={className} {...props}>
      {children}
    </main>
  )
}