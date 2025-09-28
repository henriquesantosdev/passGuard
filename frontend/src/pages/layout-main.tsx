import MainContent from "./main-contet";
import { Outlet } from "react-router-dom";

export default function LayoutMain() {
  return (
    <MainContent>
      <Outlet />
    </MainContent>
  )
}