export interface ProductoCategoria {
  id: number
  categoria: string
}

export interface CreateProductoCategoria {
  categoria: string
}

export interface UpdateProductoCategoria
  extends Partial<CreateProductoCategoria> {
  id: number
}
