import { createContext, useState, useEffect, ReactNode } from 'react'

// definir tipos para la información de usuario
interface UserInfo {
  userId: number
  name: string
  lastname: string
  rol: boolean
}

// definir la interfaz para el contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean
  userInfo: UserInfo | null
  token: string | null
  login: (token: string) => void
  logout: () => void
  loading: boolean
}

// calor por defecto para el contexto de autenticación
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  userInfo: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true
}

// crear el contexto de autenticación
export const AuthContext = createContext<AuthContextType>(defaultAuthContext)

// propiedades para el proveedor de autenticación
interface AuthProviderProps {
  children: ReactNode
}

// función para decodificar el token JWT
const decodeToken = (token: string): UserInfo | null => {
  try {
    const decodedPayload = JSON.parse(atob(token.split('.')[1]))

    return {
      userId: decodedPayload.userId,
      name: decodedPayload.name,
      lastname: decodedPayload.lastname,
      rol: decodedPayload.rol
    }
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

// función para determinar si el token ha expirado
const isTokenExpired = (token: string): boolean => {
  try {
    const decodedPayload = JSON.parse(atob(token.split('.')[1]))
    return decodedPayload.exp * 1000 < Date.now()
  } catch (error) {
    // si existe algún error se considera que el token ha expirado
    console.error('Error decoding token:', error)
    return true
  }
}

// componente proveedor de autenticación
export default function AuthProvider({ children }: AuthProviderProps) {
  // estados para el token y la autenticación
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  // useEffect para verificar el token al cargar la pagina o cambio de ruta
  useEffect(() => {
    const verifyToken = () => {
      setLoading(true)
      if (!token) {
        setIsAuthenticated(false)
        setUserInfo(null)
        setLoading(false)
        return
      }
      if (isTokenExpired(token)) {
        logout()
        setLoading(false)
        return
      }
      const decoded = decodeToken(token)
      if (decoded) {
        setIsAuthenticated(true)
        setUserInfo(decoded)
      } else {
        logout()
      }
      setLoading(false)
    }
    verifyToken()
    const intervalId = setInterval(verifyToken, 60000)
    return () => clearInterval(intervalId)
  }, [token])

  // función para iniciar sesión
  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
    setUserInfo(null)
  }
  // Retornar el contexto a los componentes hijos
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userInfo, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
