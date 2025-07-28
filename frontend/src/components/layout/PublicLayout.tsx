import { useEffect, useState } from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { Logo3, Logo2 } from '@/assets/images'
import { FaGithub, FaSignInAlt } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { MdContactPhone } from 'react-icons/md'
import {
  FaLocationDot,
  FaSquareFacebook,
  FaSquareInstagram
} from 'react-icons/fa6'
import { LuInstagram } from 'react-icons/lu'
import { ROUTES } from '@/utils/constants'
import { MobileNav } from '@/components'
const menuLinks = [
  { to: ROUTES.HOME, label: 'Inicio' },
  { to: ROUTES.CASILLEROS, label: 'Casilleros' },
  { to: ROUTES.TIENDA, label: 'Tienda' }
]

const PublicLayout = () => {
  const [isNavSticky, setIsNavSticky] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById('hero')?.offsetHeight || 0
      const scrollPosition = window.scrollY

      setIsNavSticky(scrollPosition >= heroHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header id="hero" className="bg-blue-600 text-white">
        <div className="w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-cover bg-center relative  bg-[url('assets/images/cover.webp')]">
          <div className="absolute inset-0 bg-black/50 z-0"></div>
          {/* Usamos ref para referenciar la imagen */}
          <div className="flex flex-col items-center justify-center">
            <img
              alt="lobo"
              src={Logo3}
              className="w-[300px] z-20 animate-pulse"
              style={{
                filter:
                  'drop-shadow(0 0 5px #0077ff) drop-shadow(0 0 15px #0077ff)'
              }}
            />
            <h1 className="text-5xl text-center font-bold text-white z-2 text-shadow-sm text-shadow-blue-500">
              Asociación de Estudiantes de Ingeniería Electrónica
            </h1>
          </div>
        </div>
      </header>
      {/* Nav */}
      <nav
        className={`w-full flex items-center justify-between px-10 sm:px-30 bg-blue-900 h-[70px] border-t-white border-b-blue-600 border-y transition-all ease-in-out duration-800 shadow-lg shadow-black/50  ${
          isNavSticky ? 'fixed top-0 z-50' : 'relative'
        }`}
      >
        <div className="flex items-center justify-center">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <img alt="lobo" src={Logo2} className="w-[75px]  z-2" />{' '}
            {/* <strong
              className="font-bold text-lg"
              style={{ fontFamily: 'serif' }}
            >
              AEIE
            </strong> */}
          </Link>
        </div>
        <div className="flex items-center gap-10 sm:gap-20">
          {/* Desktop navigation */}
          <ul className="hidden sm:flex items-center gap-20">
            {menuLinks.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-white font-bold text-sm hover:text-blue-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Mobile navigation */}
          <MobileNav />
          <div className="flex items-center gap-10">
            <NavLink to="https://www.facebook.com/epn.aeie" target="_blank">
              <FaSquareFacebook className="w-6 h-6" />
            </NavLink>
            <NavLink to="https://www.instagram.com/aeie_epn" target="_blank">
              <LuInstagram className="w-6 h-6" />
            </NavLink>
            <Link to={ROUTES.LOGIN}>
              <FaSignInAlt className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className={`flex-grow bg-white ${isNavSticky ? 'pt-18' : ''}`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-10 px-10 flex justify-center items-center border-t border-blue-600">
        <div className="w-8/9 flex flex-col lg:flex-row items-center justify-center gap-20">
          <section className="flex flex-1 flex-col items-center lg:items-start justify-center">
            <p className="text-sm">
              &copy; 2025-2026 <strong className="font-bold">AEIE.</strong>
            </p>
            <p className="text-sm flex justify-center items-center gap-2">
              <strong className="font-bold">Designed by</strong>
              <NavLink
                to="https://github.com/stalin21r"
                target="_blank"
                className="text-blue-500 font-bold hover:text-blue-300 flex items-center gap-1"
              >
                Stalin García
                <FaGithub className="text-white" />
              </NavLink>
            </p>
          </section>
          <section className="flex flex-1 flex-col items-center justify-center text-sm space-y-2">
            <h5 className="font-semibold">Contactos</h5>
            <div className="w-full flex flex-col items-start justify-center space-y-2">
              <p className="flex items-center gap-2">
                <IoMdMail />
                <strong>asociacionelectronica@epn.edu.ec</strong>{' '}
              </p>
              <p className="flex items-center gap-2">
                <MdContactPhone /> <strong>+593 987822975</strong>
              </p>
              <p className="flex items-center gap-2">
                <MdContactPhone /> <strong>+593 987822975</strong>
              </p>
              <p className="flex items-center gap-2">
                <FaLocationDot />
                <NavLink to="https://maps.app.goo.gl/1Ri2EGQ4e8HttZKB9">
                  <strong>
                    Av. Ladrón de Guevara E11-253 170525 Quito, Ecuador
                  </strong>
                </NavLink>
              </p>
            </div>
          </section>
          <section className=" flex flex-1 flex-col items-center justify-center">
            <h5 className="font-semibold">Síguenos</h5>
            <div className="flex items-center justify-center gap-1">
              <NavLink to="https://www.facebook.com/epn.aeie" target="_blank">
                <FaSquareFacebook className="w-10 h-10" />
              </NavLink>
              <NavLink to="https://www.instagram.com/aeie_epn" target="_blank">
                <FaSquareInstagram className="w-10 h-10" />
              </NavLink>
            </div>
          </section>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
