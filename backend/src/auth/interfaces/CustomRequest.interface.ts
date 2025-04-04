import { Request } from 'express'

export interface CustomRequest extends Request {
  user: {
    userId: number
    name: string
    lastname: string
    rol: boolean
    // Agrega aquí otras propiedades que tenga tu usuario
  }
}
