import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  FloatingLabelInput,
  FloatingLabelSelect,
  ProductoCard,
  ProductoCardSkeleton,
  Pagination
} from '@/components'
import { toast } from 'react-toastify'
import { ProductoService, ProductoCategoriaService } from '@/services'
import { Producto, ProductoCategoria } from '@/types'
import { Logo2 } from '@/assets/images'
export default function Tienda() {
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [categorias, setCategorias] = useState<ProductoCategoria[]>([])
  const [productos, setProductos] = useState<Producto[]>([])
  const [selectedCategoria, setSelectedCategoria] = useState('')
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

  return (
    <div className="bg-[#0b0d36] px-20 py-10">
      {/* META SEO */}
      <Helmet>
        <title>
          Tienda | AEIE - Asociación de Estudiantes de Ingeniería Electrónica
        </title>
        <meta
          name="description"
          content="Explora y adquiere productos útiles para tus estudios o actividades en la Tienda de la AEIE de la Escuela Politécnica Nacional."
        />
        <meta
          name="keywords"
          content="tienda AEIE, productos estudiantes, electrónica EPN, materiales, artículos electrónicos, servicios estudiantiles"
        />
        <meta property="og:title" content="Tienda | AEIE - Electrónica EPN" />
        <meta
          property="og:description"
          content="Encuentra artículos, accesorios y materiales disponibles para estudiantes de Electrónica en la Tienda AEIE."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://asoelectronicaepn.netlify.app/tienda"
        />
        <meta
          property="og:image"
          content="https://asoelectronicaepn.netlify.app/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tienda AEIE - Electrónica EPN" />
        <meta
          name="twitter:description"
          content="Adquiere productos útiles en la tienda para estudiantes de Ingeniería Electrónica."
        />
        <meta
          name="twitter:image"
          content="https://asoelectronicaepn.netlify.app/og-image.png"
        />
      </Helmet>
      <div className="w-full flex flex-col items-center justify-center space-y-6">
        <section>
          <img src={Logo2} alt="" />
          <h2 className="text-4xl font-bold text-[#b3c7e6]">Tienda</h2>
        </section>
        <section className="w-2/5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-10 xl:gap-30">
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
      </div>
    </div>
  )
}
//#0b0d36
