import { useVaults } from "@/contexts/hooks/useVaults"
import { useEffect } from "react"
import { Skeleton } from "./ui/skeleton"

export const DetailsBarPassword = () => {

  const { getVaultsInfoLoading, getVaultsInfo, vaultsInfo } = useVaults()

  useEffect(() => {
    getVaultsInfo()
  }, [getVaultsInfo])

  return (
    <>
      {getVaultsInfoLoading ? (
        <div className="bg-white p-4 rounded-md mt-16 grid grid-cols-4 gap-2">
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-md mt-16 grid grid-cols-4 gap-2">
          <div className="bg-denim-100/50 p-4  rounded-md text-denim-900">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-denim-900 rounded-full"></div>
              <h3 className="font-semibold text-xl">Saved Passwords</h3>
            </div>
            <p>{vaultsInfo?.savedVaults}</p>
          </div>

          <div className="bg-green-100/50 p-4 rounded-md text-green-700">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-green-700 rounded-full"></div>
              <h3 className="font-semibold text-xl">Strong</h3>
            </div>
            <p>{vaultsInfo?.strong}</p>
          </div>

          <div className="bg-red-100/50 p-4 rounded-md text-red-700">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-red-700 rounded-full"></div>
              <h3 className="font-semibold text-xl">Weak</h3>
            </div>
            <p>{vaultsInfo?.weak}</p>
          </div>

          <div className="bg-orange-100/50 p-4 rounded-md text-orange-500">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h3 className="font-semibold text-xl">Duplicate</h3>
            </div>
            <p>{vaultsInfo?.duplicated}</p>
          </div>
        </div>
      )}
    </>
  )
}