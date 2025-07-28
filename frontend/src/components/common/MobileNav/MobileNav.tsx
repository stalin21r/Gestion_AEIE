import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/utils/constants'
import { IoMenu } from 'react-icons/io5'

const menuLinks = [
  { to: ROUTES.HOME, label: 'Inicio' },
  { to: ROUTES.TIENDA, label: 'Tienda' },
  { to: ROUTES.CASILLEROS, label: 'Casilleros' }
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sm:hidden relative">
      <button
        aria-label="Abrir menú"
        className="w-10 h-10 rounded-full flex flex-col justify-center items-center bg-inherit hover:bg-white active:bg-white focus:outline-none text-white hover:text-blue-500 active:text-blue-500 transition-all duration-300 ease-in-out"
        onClick={() => setOpen(prev => !prev)}
      >
        <IoMenu className="text-2xl font-bold" />
      </button>
      {open && (
        <ul className="absolute -right-15 mt-2 w-40 bg-white rounded shadow-lg z-50">
          {menuLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="block px-4 py-4 text-gray-800 hover:bg-blue-300 focus:bg-blue-600 active:bg-blue-700 focus:outline-none transition-all duration-300 ease-in-out"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
