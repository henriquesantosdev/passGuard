const tokenName = import.meta.env.VITE_JWT_TOKEN_NAME

interface User {
  id: string;
  email: string;
  created_at: string;
  token: string
}

export const setUserStorage = (user: User | null) => {
  localStorage.setItem(tokenName, JSON.stringify(user))
}

export const getUserStorage = (): User | null => {
  const user = localStorage.getItem(tokenName)
  return user ? JSON.parse(user) : null
}

export const removeUserStorage = async () => {
  localStorage.removeItem(tokenName)
}