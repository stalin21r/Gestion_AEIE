import { RouteObject, createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { ROUTES } from '@/utils/constants'

// Layouts
import PublicLayout from '@/components/layout/PublicLayout'
import AdminLayout from '@/components/layout/AdminLayout'

// Páginas públicas (Landing)
// import LandingHome from '@/pages/Landing/Home'
// import LandingTienda from '@/pages/Landing/Tienda'
// import LandingCasilleros from '@/pages/Landing/Casilleros'

// Páginas de autenticación
import Login from '@/pages/Auth'
// import Register from '@/pages/Auth/Register'
// import ForgotPassword from '@/pages/Auth/ForgotPassword'

// Páginas de administración
// import AdminHome from '@/pages/Administration/Home'
// import AdminTienda from '@/pages/Administration/Tienda'
// import AdminCasilleros from '@/pages/Administration/Casilleros'
// import AdminTurnos from '@/pages/Administration/Turnos'
// import AdminConfiguracion from '@/pages/Administration/Configuracion'
// import UserProfile from '@/pages/Administration/UserProfile'

// Páginas de error
// import NotFound from '@/pages/NotFound'

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
      { index: true, element: <h1>hola mundo</h1> }
      // Rutas públicas (comentadas hasta que se implementen las páginas)
      // { index: true, element: <LandingHome /> },
      // { path: ROUTES.PUBLIC_TIENDA, element: <LandingTienda /> },
      // { path: ROUTES.PUBLIC_CASILLEROS, element: <LandingCasilleros /> },
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
      {
        index: true,
        element: <h1>hola mundo este es la pagina de administracion</h1>
      }
      // Páginas de administración (comentadas hasta que se implementen las páginas)
      // { index: true, element: <AdminHome /> },
      // { path: 'tienda', element: <AdminTienda /> },
      // { path: 'casilleros', element: <AdminCasilleros /> },
      // { path: 'turnos', element: <AdminTurnos /> },
      // { path: 'configuracion', element: <PrivateRoute adminOnly={true}><AdminConfiguracion /></PrivateRoute> },
      // { path: 'perfil', element: <UserProfile /> },
    ]
  }

  // Ruta para 404 (comentada hasta tener la página de NotFound)
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]

// Crear el router
const router = createBrowserRouter(routes)

export default router
