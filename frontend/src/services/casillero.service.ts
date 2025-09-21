import api from './api'
import axios from 'axios'
import type {
  ApiResponse,
  Ocupancia,
  CrearBloqueYCasillerosArray
} from '@/types'

interface CasilleroError {
  message: string
}

const CasilleroService = {
  async createBloque(
    mode: boolean
  ): Promise<ApiResponse<CrearBloqueYCasillerosArray>> {
    try {
      const response = await api.post<ApiResponse<CrearBloqueYCasillerosArray>>(
        `/casillero/bloque`,
        { mode }
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: CasilleroError = error.response.data
        throw new Error(errorData.message || 'Error al crear bloque')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al crear bloque')
    }
  },
  async getOcupancia(): Promise<ApiResponse<Ocupancia[]>> {
    try {
      const response = await api.get<ApiResponse<Ocupancia[]>>(
        '/casillero/ocupacion'
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData: CasilleroError = error.response.data
        throw new Error(errorData.message || 'Error al obtener ocupancia')
      }
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Error desconocido al obtener ocupancia')
    }
  }
}

export default CasilleroService
