export interface CustomRequest extends Request {
  user: {
    userId: string // UUID string
    nombre: string
    apellido: string
    rol: {
      nombre: string
    }
    // Puedes añadir otros campos que quieras propagar desde el payload JWT
  }
}
