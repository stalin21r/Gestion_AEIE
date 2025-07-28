import api from './api'
import axios from 'axios'
import type {
  ApiResponse,
  ProductoCategoria,
  CreateProductoCategoria,
  UpdateProductoCategoria
} from '@/types'

interface ProductoCategoriaError {
  message: string
}

const ProductoCategoriaService = {
  async createCategoria(
    categoria: CreateProductoCategoria
  ): Promise<ApiResponse<ProductoCategoria>> {
    try {
      const response = await api.post<ApiResponse<ProductoCategoria>>(
        '/producto-categoria',
        categoria
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoCategoriaError = error.response.data
        throw new Error(errorData.message || 'Error al crear producto')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al crear producto')
    }
  },

  async findAllCategorias(): Promise<ApiResponse<ProductoCategoria[]>> {
    try {
      const response = await api.get<ApiResponse<ProductoCategoria[]>>(
        '/producto-categoria'
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoCategoriaError = error.response.data
        throw new Error(errorData.message || 'Error al obtener productos')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al obtener productos')
    }
  },

  async findCategoriaById(id: number): Promise<ApiResponse<ProductoCategoria>> {
    try {
      const response = await api.get<ApiResponse<ProductoCategoria>>(
        `/producto-categoria/${id}`
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoCategoriaError = error.response.data
        throw new Error(errorData.message || 'Error al obtener producto')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al obtener producto')
    }
  },

  async updateCategoria(
    id: number,
    categoria: UpdateProductoCategoria
  ): Promise<ApiResponse<ProductoCategoria>> {
    try {
      const response = await api.put<ApiResponse<ProductoCategoria>>(
        `/producto-categoria/${id}`,
        categoria
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoCategoriaError = error.response.data
        throw new Error(errorData.message || 'Error al actualizar producto')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al actualizar producto')
    }
  },

  async deleteCategoria(id: number): Promise<ApiResponse<ProductoCategoria>> {
    try {
      const response = await api.delete<ApiResponse<ProductoCategoria>>(
        `/producto-categoria/${id}`
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: ProductoCategoriaError = error.response.data
        throw new Error(errorData.message || 'Error al eliminar producto')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al eliminar producto')
    }
  }
}

export default ProductoCategoriaService
