import { RouteObject, createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { ROUTES } from '@/utils/constants'

// Layouts
import PublicLayout from '@/components/layout/PublicLayout'
import AdminLayout from '@/components/layout/AdminLayout'

// Páginas públicas (Landing)
import { Casilleros, Home, Tienda } from '@/pages/Landing'

// Páginas de autenticación
import Login from '@/pages/Auth'
// import Register from '@/pages/Auth/Register'
// import ForgotPassword from '@/pages/Auth/ForgotPassword'

// Páginas de administración
import {
  AdminHome,
  AdminTienda,
  AdminCasilleros,
  AdminTurnos,
  UserProfile
} from '@/pages/Administration/'

import NotFound from '@/pages/NotFound/NotFound'

// Definición de rutas
const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <Login />
  },
  // Rutas públicas con layout público
  {
    path: ROUTES.HOME,
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.TIENDA, element: <Tienda /> },
      { path: ROUTES.CASILLEROS, element: <Casilleros /> }
      // Rutas de autenticación
      //{ path: ROUTES.LOGIN, element: <Login /> }
      // TODO: Se deja expresado el registro y la recuperación de contraseña para implementación futura
      /*
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
      */
    ]
  },

  // Rutas privadas con layout de administración
  {
    path: ROUTES.ADMIN_HOME,
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      // Páginas de administración (comentadas hasta que se implementen las páginas)
      { index: true, element: <AdminHome /> },
      { path: ROUTES.ADMIN_TIENDA, element: <AdminTienda /> },
      { path: ROUTES.ADMIN_CASILLEROS, element: <AdminCasilleros /> },
      { path: ROUTES.ADMIN_TURNOS, element: <AdminTurnos /> },
      { path: ROUTES.USER_PROFILE, element: <UserProfile /> }
      // { path: 'configuracion', element: <PrivateRoute adminOnly={true}><AdminConfiguracion /></PrivateRoute> },
    ]
  },

  // Ruta para 404 (comentada hasta tener la página de NotFound)
  {
    path: '*',
    element: <NotFound />
  }
]

// Crear el router
const router = createBrowserRouter(routes)

export default router
