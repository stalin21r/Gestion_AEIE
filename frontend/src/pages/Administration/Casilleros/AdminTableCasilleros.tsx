import { LoadingOverlay } from '@/components'
import { CasilleroService } from '@/services'
import { Ocupancia } from '@/types'
import { ROUTES } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaArrowLeft } from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EmptyStateIcon = () => (
  <svg
    className="h-12 w-12 text-white/60"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-5.5a2 2 0 00-2 2v3a2 2 0 002 2H20M9 5l2 2 4-4"
    />
  </svg>
)
export default function AdminTableCasilleros() {
  const MySwal = withReactContent(Swal)
  const [loading, setLoading] = useState(false)
  const [ocupacion, setOcupacion] = useState<Ocupancia[] | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const result = await CasilleroService.getOcupancia()
      setOcupacion(result.data)
      toast.success(result.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const HandleCreateBloque = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const confirmacion = await MySwal.fire({
        title: '¿Está seguro de crear un bloque?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3d82f6',
        cancelButtonColor: '#E44F38'
      })
      if (!confirmacion.isConfirmed) {
        return
      }
      const modo = await MySwal.fire({
        title: 'Elige el modo de creación, numeración Horizontal o Vertical.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Horizontal',
        cancelButtonText: 'Vertical',
        confirmButtonColor: '#5e9e0c',
        cancelButtonColor: '#e17828'
      })
      const result = await CasilleroService.createBloque(modo.isConfirmed)
      toast.success(result.message)
      await loadData()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      <section className="w-7/9 flex items-center justify-between ">
        <h3 className="text-5xl font-bold text-white">Casilleros</h3>
        <div className="flex justify-center items-center gap-2">
          <button
            className="bg-green-600 text-white border-none rounded-lg px-5 py-2 text-md font-semibold cursor-pointer shadow-md transition-colors duration-200 hover:bg-[#1565c0]"
            onClick={e => HandleCreateBloque(e)}
          >
            Crear Bloque
          </button>
          <Link
            to={ROUTES.ADMIN_CASILLEROS}
            className="flex items-center gap-2 bg-[#1976d2] text-white border-none rounded-lg px-5 py-2 text-md font-semibold cursor-pointer shadow-md transition-colors duration-200 hover:bg-[#1565c0]"
          >
            <FaArrowLeft />
            Atrás
          </Link>
        </div>
      </section>
      <section className="pt-8 w-full flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-w-7xl">
          {/* Header */}
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
              <tr>
                {[
                  '#',
                  'Bloque',
                  'Casilleros',
                  'Ocupados',
                  'Libres',
                  'Ocupación %',
                  'Acciones'
                ].map((item, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wide"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-white/10">
              {ocupacion?.length === 0 || ocupacion === null ? (
                // Estado vacío
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="bg-white/10 rounded-full p-4">
                        <EmptyStateIcon />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white">
                          No hay datos disponibles
                        </h3>
                        <p className="text-white/60 text-sm max-w-sm">
                          Cuando tengas información de ocupancia, aparecerá aquí
                          de forma organizada y fácil de leer.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                // Filas de datos
                ocupacion?.map((item, index) => (
                  <tr
                    key={index}
                    className={`
                  text-white transition-all duration-200 ease-in-out
                  hover:bg-white/10 hover:scale-[1.01] hover:shadow-lg
                  ${index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}
                  group cursor-pointer
                `}
                  >
                    {/* Número de fila */}
                    <td className="px-6 py-4 text-center font-mono text-white/80 group-hover:text-white transition-colors">
                      {index + 1}
                    </td>

                    {/* Bloque */}
                    <td className="px-6 py-4 font-bold text-2xl text-center group-hover:text-blue-200 transition-colors">
                      {item.bloque}
                    </td>

                    {/* Casilleros */}
                    <td className="px-6 py-4 text-center font-mono">
                      {item.casilleros.toLocaleString()}
                    </td>

                    {/* Ocupados */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-200 border border-red-500/30">
                        {item.ocupados.toLocaleString()}
                      </span>
                    </td>

                    {/* Libres */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-200 border border-green-500/30">
                        {item.libres.toLocaleString()}
                      </span>
                    </td>

                    {/* Ocupación % */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-300 group-hover:from-blue-300 group-hover:to-blue-400"
                            style={{ width: `${item.ocupacion}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium min-w-[3rem]">
                          {item.ocupacion}%
                        </span>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => {
                            console.log('Editar casillero')
                          }}
                          className="bg-[#1976d2] text-white border-none rounded-lg px-5 py-2 text-md font-semibold cursor-pointer shadow-md transition-colors duration-200 hover:bg-[#1565c0]"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            console.log('Eliminar casillero')
                          }}
                          className="bg-red-500 text-white border-none rounded-lg px-5 py-2 text-md font-semibold cursor-pointer shadow-md transition-colors duration-200 hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      {loading && <LoadingOverlay />}
    </div>
  )
}
