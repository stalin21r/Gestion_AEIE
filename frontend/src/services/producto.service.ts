import api from './api'
import axios from 'axios'
import type {
  ApiResponse,
  Producto,
  CreateProducto,
  UpdateProducto,
  FindAllProductsResponse,
  FindProductsOptions
} from '@/types'

interface ProductoError {
  message: string
}

const ProductoService = {
  async createProducto(
    producto: CreateProducto
  ): Promise<ApiResponse<Producto>> {
    try {
      const formData = new FormData()
      formData.append('nombre', producto.nombre)
      formData.append('precio', producto.precio.toString())
      formData.append('categoria', producto.categoria.toString())
      if (producto.imagen) {
        formData.append('imagen', producto.imagen)
      }

      const response = await api.post<ApiResponse<Producto>>(
        '/producto',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoError = error.response.data
        throw new Error(errorData.message || 'Error al crear producto')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al crear producto')
    }
  },

  async findAllProductos(
    options: FindProductsOptions = {}
  ): Promise<ApiResponse<FindAllProductsResponse>> {
    try {
      const params = new URLSearchParams()
      if (options.search) params.append('search', options.search)
      if (options.categoria)
        params.append('categoria', options.categoria.toString())
      if (options.page) params.append('page', options.page.toString())
      if (options.limit) params.append('limit', options.limit.toString())

      const response = await api.get<ApiResponse<FindAllProductsResponse>>(
        '/producto',
        {
          params
        }
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoError = error.response.data
        throw new Error(errorData.message || 'Error al obtener productos')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al obtener productos')
    }
  },

  async findProductoById(id: number): Promise<ApiResponse<Producto>> {
    try {
      const response = await api.get<ApiResponse<Producto>>(`/producto/${id}`)
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoError = error.response.data
        throw new Error(errorData.message || 'Error al obtener producto')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al obtener producto')
    }
  },

  async updateProducto(
    id: number,
    producto: UpdateProducto
  ): Promise<ApiResponse<Producto>> {
    try {
      const formData = new FormData()
      if (producto.nombre !== undefined)
        formData.append('nombre', producto.nombre)
      if (producto.precio !== undefined)
        formData.append('precio', producto.precio.toString())
      if (producto.categoria !== undefined)
        formData.append('categoria', producto.categoria.toString())
      if (producto.imagen) {
        formData.append('imagen', producto.imagen)
      }

      const response = await api.patch<ApiResponse<Producto>>(
        `/producto/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoError = error.response.data
        throw new Error(errorData.message || 'Error al actualizar producto')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al actualizar producto')
    }
  },

  async deleteProducto(id: number): Promise<ApiResponse<Producto>> {
    try {
      const response = await api.delete<ApiResponse<Producto>>(
        `/producto/${id}`
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoError = error.response.data
        throw new Error(errorData.message || 'Error al eliminar producto')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al eliminar producto')
    }
  }
}

export default ProductoService
