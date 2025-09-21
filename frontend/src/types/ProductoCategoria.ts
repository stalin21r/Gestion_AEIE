export interface ProductoCategoria {
  id: string
  categoria: string
}

export interface CreateProductoCategoria {
  categoria: string
}

export interface UpdateProductoCategoria
  extends Partial<CreateProductoCategoria> {
  id: string
}
