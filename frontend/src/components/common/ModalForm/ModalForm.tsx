import React, { useEffect, useRef } from 'react'

interface ModalFormProps {
  open: boolean
  title: string
  showDelete?: boolean
  showCancel?: boolean
  showSave?: boolean
  onDelete?: () => void
  onCancel: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

const ModalForm: React.FC<ModalFormProps> = ({
  open,
  title,
  showDelete = false,
  showCancel = true,
  showSave = true,
  onDelete,
  onCancel,
  onSubmit,
  children
}) => {
  const modalRef = useRef<HTMLFormElement>(null)

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onCancel()
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn space-y-10"
      >
        {/* Título y botón de cerrar */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-2">
          <h2 className="text-2xl font-bold text-blue-800">{title}</h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-red-700 hover:scale-110 text-xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="mb-6 space-y-4">{children}</div>

        {/* Botones de acción */}
        <div className="flex justify-between gap-3 mt-10 border-t border-gray-300 pt-4">
          {showSave && (
            <button
              type="submit"
              className="px-6 py-2 font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 cursor-pointer transition-all duration-300"
            >
              Guardar
            </button>
          )}
          {showDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="px-6 py-2 font-semibold rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer transition-all duration-300"
            >
              Eliminar
            </button>
          )}
          {showCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all duration-300"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ModalForm
