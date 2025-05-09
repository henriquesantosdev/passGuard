import { ReactNode, useCallback, useEffect, useState } from "react"
import { AuthContext, User } from "./AuthContext"
import { api } from "@/api/axios"
import { useNavigate } from "react-router-dom"
import { getUserStorage, removeUserStorage, setUserStorage } from "@/utils/user-storage"
import { encryptPassword } from "@/utils/crypto"

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [userCreated, setUserCreated] = useState(false)
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

  const signUp = async (email: string, password: string, passphrase: string) => {
    setLoading(true)

    const passphraseEncrypted = await encryptPassword(
      import.meta.env.VITE_APP_ENCRYPTION_BASE_PASSPHRASE,
      passphrase
    )

    api.post('/users', {
      email,
      password,
      passphrase: passphraseEncrypted
    }).then(() => {
      setUserCreated(true)
      navigate('/', { replace: true })
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
        userCreated,
        setUserCreated,
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