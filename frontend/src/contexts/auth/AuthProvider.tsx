import { ReactNode, useCallback, useEffect, useState } from "react"
import { AuthContext, User } from "./AuthContext"
import { api } from "@/api/axios"
import { useNavigate } from "react-router-dom"
import { getUserStorage, removeUserStorage, setUserStorage } from "@/utils/user-storage"

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const user = getUserStorage()
    if (user) {
      setUser(user)
      setLoading(false)
      return
    }
    navigate('/signin')
    setLoading(false)
  }, [navigate])

  const signIn = (email: string, password: string) => {
    setLoading(true)
    api.post('/auth', {
      email,
      password
    }).then((response) => {
      setUser(response.data)
      setUserStorage(response.data)
      navigate('/dashboard', { replace: true })
    }).catch((error) => {
      console.log(error)
    })
      .finally(() => {
        setLoading(false)
      })
  }

  const signUp = (email: string, password: string) => {
    setLoading(true)
    api.post('/users', {
      email,
      password
    }).then((response) => {
      setUser(response.data)
    }).catch((error) => {
      console.log(error)
    })
      .finally(() => {
        setLoading(false)
      })
  }

  const signOut = () => {
    setUser(null)
    removeUserStorage()
    navigate('/', { replace: true })
  }

  const verifySignedUser = useCallback(() => {
    setLoading(true)
    const user = getUserStorage()
    if (user) {
      setUser(user)
      setLoading(false)
      navigate('/dashboard', { replace: true })
    }
    setLoading(false)
  }, [navigate])

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        signOut,
        verifySignedUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;