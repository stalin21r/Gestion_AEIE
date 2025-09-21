import { ReactNode, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/utils/constants'
import { LoadingOverlay } from '@/components'

interface PrivateRouteProps {
  children: ReactNode
  adminOnly?: boolean
  superAdminOnly?: boolean
}

export default function PrivateRoute({
  children,
  adminOnly = false,
  superAdminOnly = false
}: PrivateRouteProps) {
  const { isAuthenticated, userInfo } = useAuth()
  const location = useLocation()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // Esperamos medio segundo para permitir ver la vista anterior
    const timer = setTimeout(() => setCheckingAuth(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (checkingAuth) {
    return (
      <>
        {children}
        <LoadingOverlay />
      </>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />
  }

  if (
    adminOnly &&
    userInfo &&
    userInfo.rol !== 'ADMIN' &&
    userInfo.rol !== 'SUPERADMIN'
  ) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />
  }

  if (superAdminOnly && userInfo && userInfo.rol !== 'SUPERADMIN') {
    return <Navigate to={ROUTES.NOT_FOUND} replace />
  }

  return <>{children}</>
}
