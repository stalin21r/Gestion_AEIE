import { ProductoCategoria } from './ProductoCategoria'
export interface Producto {
  id: string
  nombre: string
  precio: number
  categoria: ProductoCategoria
  imagen: string
}

export interface FindAllProductsResponse {
  products: Producto[]
  total: number
}

export interface FindProductsOptions {
  search?: string
  categoria?: string
  page?: number
  limit?: number
}

export interface CreateProducto {
  nombre: string
  precio: number
  categoria: string
  imagen?: File
}

export interface UpdateProducto extends Partial<CreateProducto> {}
