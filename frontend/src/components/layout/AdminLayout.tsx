import { useEffect, useState, useRef } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Lobo, Logo2 } from '@/assets/images'
import { ROUTES } from '@/utils/constants'

const AdminLayout = () => {
  const { userInfo, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActiveRoute = (route: string) => {
    return (
      location.pathname === route || location.pathname.startsWith(`${route}/`)
    )
  }

  const getNavItemClasses = (route: string) =>
    `text-center text-lg text-black w-full py-2 transition duration-300 hover:bg-[#fdd835] ${
      isActiveRoute(route) && !location.pathname.includes(route + '/')
        ? 'bg-[#fde269]'
        : 'bg-white'
    }`

  // Cierra el menú perfil si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const SidebarContent = () => (
    <>
      <img
        className="w-25 h-30 rounded-xl mt-10 mb-10"
        src={Lobo}
        alt="Lobo-AEIE"
      />

      <Link to={ROUTES.HOME}>
        <h2 className="flex-3 text-[1.5rem] text-[#042141] font-bold">AEIE</h2>
      </Link>

      <nav className="w-full flex flex-col items-center justify-center mt-6">
        <Link
          to={ROUTES.ADMIN_HOME}
          className={getNavItemClasses(ROUTES.ADMIN_HOME)}
        >
          Inicio
        </Link>
        <Link
          to={ROUTES.ADMIN_TIENDA}
          className={getNavItemClasses(ROUTES.ADMIN_TIENDA)}
        >
          Tienda
        </Link>
        <Link
          to={ROUTES.ADMIN_CASILLEROS}
          className={getNavItemClasses(ROUTES.ADMIN_CASILLEROS)}
        >
          Casilleros
        </Link>
        <Link
          to={ROUTES.ADMIN_TURNOS}
          className={getNavItemClasses(ROUTES.ADMIN_TURNOS)}
        >
          Turnos y Asistencia
        </Link>
        {userInfo?.rol && (
          <Link
            to={ROUTES.ADMIN_CONFIGURACION}
            className={getNavItemClasses(ROUTES.ADMIN_CONFIGURACION)}
          >
            Administrar Usuarios
          </Link>
        )}
      </nav>

      <div
        ref={menuRef}
        className="mt-auto p-2 flex flex-col items-start w-full relative"
      >
        <div className="group flex items-center justify-start p-2 rounded-lg w-full transition-colors">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:scale-115 hover:shadow-xl-blue transition duration-300 ${
              menuOpen ? 'scale-110 shadow-xl-blue' : ''
            }`}
          >
            <span className="text-sm font-semibold text-white">
              {userInfo?.name?.charAt(0)}
              {userInfo?.lastname?.charAt(0)}
            </span>
          </button>
          <div className="ml-3 flex flex-col items-start justify-center">
            <h5 className="font-bold text-gray-700 text-sm">
              {userInfo?.name} {userInfo?.lastname}
            </h5>
            <p className="text-xs text-blue-500 font-semibold">
              {userInfo?.rol ? 'Administrador' : 'Usuario'}
            </p>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute bottom-[4.5rem] left-4 w-30 bg-white shadow-xl rounded-lg border border-gray-200 z-50">
            <Link
              to="/admin/perfil"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-xs text-gray-500 font-semibold hover:bg-gray-100 cursor-pointer border-b border-gray-200"
            >
              Mi perfil
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-xs text-[#8b0000c2] font-semibold hover:bg-gray-100 cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para pantallas grandes */}
      <aside className="hidden lg:flex w-[20%] xl:w-[15%] bg-white flex-col justify-center items-center relative">
        <SidebarContent />
      </aside>

      {/* Botón hamburguesa solo en móvil */}
      {!mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden cursor-pointer fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-full shadow-md p-3 hover:bg-[#fdd835] hover:text-white transition-colors duration-300 w-12 h-12 flex items-center justify-center"
        >
          <i className="fa-solid fa-bars text-black group-hover:text-white"></i>
        </button>
      )}

      {/* Modal sidebar para móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-500 bg-opacity-30 flex justify-center items-center">
          <div
            ref={mobileMenuRef}
            className="rounded-lg w-4/5 max-w-xs bg-white h-4/5 flex flex-col items-center justify-center p-4 relative shadow-xl"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 font-bold text-xl cursor-pointer"
            >
              ✕
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="w-full lg:w-[80%] xl:w-[85%] flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-4 bg-[#0b0d36] flex flex-col items-center w-full">
          <img src={Logo2} alt="Logo de La AEIE" className="w-32 mb-4" />
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
