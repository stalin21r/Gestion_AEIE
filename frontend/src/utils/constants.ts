// URL base de la API
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Roles de usuario
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

// Rutas de la aplicación
export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  CASILLEROS: '/casilleros',
  TIENDA: '/tienda',

  // Rutas privadas
  ADMIN_HOME: '/admin',
  ADMIN_TIENDA: '/admin/tienda',
  ADMIN_CASILLEROS: '/admin/casilleros',
  ADMIN_TURNOS: '/admin/turnos',
  ADMIN_CONFIGURACION: '/admin/configuracion',
  USER_PROFILE: '/admin/perfil'
}

// Mensajes de error
export const ERROR_MESSAGES = {
  SESSION_EXPIRED:
    'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  NETWORK_ERROR:
    'Error de conexión. Por favor, verifica tu conexión a internet.',
  UNAUTHORIZED: 'No tienes permiso para acceder a este recurso.',
  SERVER_ERROR: 'Error en el servidor. Por favor, intenta más tarde.',
  NOT_FOUND: 'El recurso solicitado no existe.',
  DEFAULT: 'Ha ocurrido un error. Por favor, intenta nuevamente.'
}
