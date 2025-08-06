import { ProductoCategoria } from './ProductoCategoria'
export interface Producto {
  id: number
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
  categoria?: number
  page?: number
  limit?: number
}

export interface CreateProducto {
  nombre: string
  precio: number
  categoria: number
  imagen?: File
}

export interface UpdateProducto extends Partial<CreateProducto> {}
