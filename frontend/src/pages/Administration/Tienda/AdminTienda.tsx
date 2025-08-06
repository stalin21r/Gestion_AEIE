import { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import {
  FloatingLabelInput,
  FloatingLabelSelect,
  ModalForm,
  ProductoCard,
  ProductoCardSkeleton,
  Pagination
} from '@/components'
import { toast } from 'react-toastify'
import { ProductoService, ProductoCategoriaService } from '@/services'
import {
  CreateProducto,
  Producto,
  ProductoCategoria,
  UpdateProducto
} from '@/types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export default function AdminTienda() {
  const MySwal = withReactContent(Swal)
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [categorias, setCategorias] = useState<ProductoCategoria[]>([])
  const [productos, setProductos] = useState<Producto[]>([])
  const [selectedCategoria, setSelectedCategoria] = useState('')
  const [selectedProducto, setSelectedProducto] =
    useState<Partial<Producto | null>>(null)
  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [openImageFile, setOpenImageFile] = useState<File | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize] = useState(8)
  const [debouncedBusqueda, setDebouncedBusqueda] = useState(busqueda)

  const loadData = async () => {
    try {
      // Obtener categorías primero
      const categoriasRes = await ProductoCategoriaService.findAllCategorias()
      setCategorias(categoriasRes.data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error desconocido')
    }
    try {
      const productosRes = await ProductoService.findAllProductos({
        search: debouncedBusqueda,
        categoria: selectedCategoria ? parseInt(selectedCategoria) : undefined,
        page: currentPage,
        limit: pageSize
      })
      setProductos(productosRes.data.products)
      setTotalPages(Math.ceil(productosRes.data.total / pageSize))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error desconocido')
      setProductos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    loadData()
  }, [debouncedBusqueda, selectedCategoria, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [busqueda, selectedCategoria])

  useEffect(() => {
    setLoading(true)
    const handler = setTimeout(() => {
      setDebouncedBusqueda(busqueda)
    }, 500) // 500ms de espera

    return () => {
      clearTimeout(handler)
    }
  }, [busqueda])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const confirmacion = await MySwal.fire({
        title: '¿Está seguro de guardar este producto?',
        text: 'No olvide verificar los datos antes de guardar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#FBD130',
        cancelButtonColor: '#E44F38'
      })
      if (!confirmacion.isConfirmed) {
        return
      }
      if (
        !selectedProducto?.nombre ||
        !selectedProducto?.precio ||
        !selectedProducto?.categoria?.id
      ) {
        await MySwal.fire({
          title: 'Por favor, complete los campos obligatorios *',
          icon: 'error',
          color: '#E44F38',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#FBD130'
        })
        return
      }
      const newProducto: CreateProducto = {
        nombre: selectedProducto?.nombre || '',
        precio: selectedProducto?.precio || 0,
        categoria: selectedProducto?.categoria?.id || 0
      }
      if (openImageFile) {
        newProducto.imagen = openImageFile
      }
      setLoading(true)
      const result = await ProductoService.createProducto(newProducto)
      toast.success(result.message)
      loadData()
      setModalFormOpen(false)
      setSelectedProducto(null)
      setOpenImageFile(null)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Error al crear producto'
      )
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const confirmacion = await MySwal.fire({
        title: '¿Está seguro de guardar este producto?',
        text: 'No olvide verificar los datos antes de guardar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#FBD130',
        cancelButtonColor: '#E44F38'
      })
      if (!confirmacion.isConfirmed) {
        return
      }
      if (
        !selectedProducto?.nombre ||
        !selectedProducto?.precio ||
        !selectedProducto?.categoria?.id
      ) {
        await MySwal.fire({
          title: 'Por favor, complete los campos obligatorios *',
          icon: 'error',
          color: '#E44F38',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#FBD130'
        })
        return
      }
      const updateProducto: UpdateProducto = {
        nombre: selectedProducto?.nombre || '',
        precio: selectedProducto?.precio || 0,
        categoria: selectedProducto?.categoria?.id || 0
      }
      if (openImageFile) {
        updateProducto.imagen = openImageFile
      }
      setLoading(true)
      const result = await ProductoService.updateProducto(
        selectedProducto?.id || 0,
        updateProducto
      )
      toast.success(result.message)
      loadData()
      setModalFormOpen(false)
      setSelectedProducto(null)
      setOpenImageFile(null)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Error al actualizar producto'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      const confirmacion = await MySwal.fire({
        title: '¿Está seguro de eliminar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#FBD130',
        cancelButtonColor: '#E44F38'
      })
      if (!confirmacion.isConfirmed) {
        return
      }
      setLoading(true)
      const result = await ProductoService.deleteProducto(
        selectedProducto?.id || 0
      )
      toast.success(result.message)
      loadData()
      setModalFormOpen(false)
      setSelectedProducto(null)
      setOpenImageFile(null)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setModalFormOpen(false)
    setSelectedProducto(null)
    setOpenImageFile(null)
  }

  const handleSelectProducto = (producto: Producto) => {
    setIsEditMode(true)
    setSelectedProducto(producto)
    setModalFormOpen(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOpenImageFile(file)
      setSelectedProducto({
        ...selectedProducto,
        imagen: URL.createObjectURL(file)
      })
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      <section className="w-7/9 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-10 xl:gap-30">
        <div className="w-1/2">
          <FloatingLabelSelect
            label="Categoría"
            name="categoria"
            value={selectedCategoria}
            onChange={e => setSelectedCategoria(e.target.value)}
            labelColor="green"
          >
            <option selected></option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.categoria}
              </option>
            ))}
          </FloatingLabelSelect>
        </div>

        <div className="w-1/2 flex justify-center items-center gap-2">
          <FloatingLabelInput
            label="Búsqueda"
            type="text"
            name="busqueda"
            labelColor="green"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>

        <div className="w-1/2 flex justify-center">
          <button
            onClick={() => {
              setIsEditMode(false)
              setSelectedProducto(null) // Esto fuerza a que se use handleCreate
              setOpenImageFile(null)
              setModalFormOpen(true)
            }}
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-xl text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
          >
            <FaPlusCircle />
            Agregar
          </button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: pageSize }).map((_, idx) => (
                <ProductoCardSkeleton key={idx} />
              ))
            : productos.map(producto => (
                <ProductoCard
                  key={producto.id}
                  producto={producto}
                  onHover
                  pointer
                  onClick={() => handleSelectProducto(producto)}
                />
              ))}
        </div>
      </section>
      <section className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          disabled={loading}
        />
      </section>
      <ModalForm
        title={`${selectedProducto ? 'Editar' : 'Agregar'} Producto`}
        open={modalFormOpen}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onSubmit={isEditMode ? handleUpdate : handleCreate}
        showSave
        showDelete={selectedProducto !== null}
        showCancel
      >
        <section className="px-2 flex flex-col gap-5 justify-center items-center">
          <FloatingLabelInput
            label="Nombre*"
            type="text"
            name="nombre"
            labelColor="blue"
            backgroundColor="white"
            textColor="black"
            value={selectedProducto?.nombre || ''}
            onChange={e =>
              setSelectedProducto({
                ...selectedProducto,
                nombre: e.target.value
              })
            }
          />
          <FloatingLabelInput
            label="Precio*"
            type="number"
            name="precio"
            labelColor="blue"
            backgroundColor="white"
            textColor="black"
            value={
              selectedProducto?.precio !== undefined
                ? String(selectedProducto.precio)
                : ''
            }
            onChange={e =>
              setSelectedProducto({
                ...selectedProducto,
                precio: Number(e.target.value)
              })
            }
          />
          <FloatingLabelSelect
            label="Categoría*"
            name="productoCat"
            backgroundColor="white"
            textColor="black"
            value={selectedProducto?.categoria?.id.toString() || ''}
            onChange={e => {
              setSelectedProducto({
                ...selectedProducto,
                categoria: categorias.find(
                  cat => cat.id.toString() === e.target.value
                )
              })
            }}
            labelColor="blue"
          >
            <option selected></option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.categoria}
              </option>
            ))}
          </FloatingLabelSelect>

          <label
            htmlFor="imagen"
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 cursor-pointer"
          >
            Seleccionar Imagen
          </label>
          <input
            id="imagen"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <img
            className="w-36 h-36 object-contain rounded-xl"
            src={selectedProducto?.imagen}
            onError={e =>
              (e.currentTarget.src = 'https://via.placeholder.com/150')
            }
          />
        </section>
      </ModalForm>
    </div>
  )
}
