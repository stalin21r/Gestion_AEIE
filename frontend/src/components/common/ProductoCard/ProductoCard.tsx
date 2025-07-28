import { Producto } from '@/types'
import { NoImage } from '@/assets/images'

interface ProductoCardProps {
  producto: Producto
  onHover: boolean
  pointer: boolean
  onClick?: (event: React.MouseEvent) => void
}
export default function ProductoCard({
  producto,
  onHover,
  pointer,
  onClick
}: ProductoCardProps) {
  return (
    <>
      <button
        className={`p-5 space-y-2 flex flex-col items-center justify-center bg-[#1c1c4b] border-none rounded-xl text-center text-white hover:bg-[#29294d] ${onHover ? 'hover:scale-105' : ''} ${pointer ? 'cursor-pointer' : ''} transition-all duration-400 ease-in-out`}
        onClick={onClick}
      >
        <div className="border-b-2 border-blue-300/20 pb-3">
          <img
            className="w-36 h-36 object-contain rounded-xl"
            src={producto.imagen ? producto.imagen : NoImage}
            alt={`${producto.categoria}/${producto.nombre}`}
          />
        </div>

        <h3 className="">{producto.nombre}</h3>
        <span className="">${producto.precio}</span>
      </button>
    </>
  )
}
