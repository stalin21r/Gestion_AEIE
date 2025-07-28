import { Logo2 } from '@/assets/images'
import { ROUTES } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a2540] flex flex-col items-center justify-center text-white">
      <img alt="Lobo-AEIE" src={Logo2} className="w-30 h-30 mb-8" />
      <h2 className="text-4xl font-bold mb-4">Página no encontrada</h2>
      <p className="text-base mb-8 text-[#b3c7e6] max-w-md text-center">
        Lo sentimos, la página que buscas no existe o fue movida. Por favor,
        regresa al inicio.
      </p>
      <button
        onClick={() => navigate(ROUTES.HOME)}
        className="bg-[#1976d2] text-white border-none rounded-lg px-8 py-3 text-base font-semibold cursor-pointer shadow-md transition-colors duration-200 hover:bg-[#1565c0]"
      >
        Ir al inicio
      </button>
    </div>
  )
}
