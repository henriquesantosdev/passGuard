import { FaGithubAlt, FaLinkedinIn } from "react-icons/fa6"
import { FooterIconSquare } from "./FooterIconSquare"

export const Footer = () => {
  return (
    <footer className="bg-denim-700 mt-8 p-4 flex flex-row justify-center gap-2 items-center">
      <p className="text-white font-semibold flex gap-2 items-center">
        Developed with ❤️ by <a href="https://www.linkedin.com/in/henrique-santos-497b0026a/" target="_blank" className="flex items-center bg-denim-800 hover:bg-denim-900 gap-2 p-1 px-3 rounded"><FaLinkedinIn /> Henriquesantosdev</a>
      </p>
      <span className="text-white"> | </span>
      <FooterIconSquare href="https://github.com/henriquesantosdev/passGuard">
        <FaGithubAlt /> View project repository
      </FooterIconSquare>
    </footer>
  )
}
