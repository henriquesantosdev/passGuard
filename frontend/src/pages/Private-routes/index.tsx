import { useAuth } from "@/contexts/hooks/useAuth"
import VaultsProvider from "@/contexts/vaults/VaultsProvider";
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
  const { signed } = useAuth();

  return signed
    ?
    <VaultsProvider>
      <Outlet />
    </VaultsProvider>
    :
    <Navigate to={'/'} replace />
}

export default PrivateRoutes;