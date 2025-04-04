import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CustomRequest } from '../interfaces/CustomRequest.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  /**
   * Determina si el usuario autenticado tiene acceso a un recurso.
   * Si el usuario no tiene acceso, lanza una excepcion ForbiddenException.
   *
   * @param context ExecutionContext. Informacion del contexto de la peticion.
   * @returns Un valor booleano que indica si el usuario tiene acceso al recurso.
   * Un valor de `true` indica que el usuario tiene acceso, un valor de `false`
   * indica que el usuario no tiene acceso.
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    /*
    const rolesPermitidos = this.reflector.get<boolean[]>(
      'roles',
      context.getHandler()
    )
    if (!rolesPermitidos || rolesPermitidos.length === 0) {
      return true
    }*/
    const request = context.switchToHttp().getRequest<CustomRequest>()
    const user = request.user
    if (!user) {
      // || !rolesPermitidos.includes(user.rol)) {
      throw new ForbiddenException('Acceso denegado.')
    }
    return true
  }
}
