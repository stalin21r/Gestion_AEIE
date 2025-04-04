import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { CustomRequest } from '../interfaces/CustomRequest.interface'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  /**
   * Constructor.
   *
   * @param jwtService The service that provides jwt functions.
   * @param config The service that provides configuration values.
   */
  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ) {}
  /**
   * Verifica si el token de autenticación es válido y lo almacena en
   * la petición.
   *
   * @param context El contexto de la petición.
   * @returns `true` si el token es válido, `false` en caso contrario.
   * @throws {UnauthorizedException} Si el token es inválido o
   * expirado.
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>()
    const authHeader = request.headers.authorization
    if (!authHeader) {
      throw new UnauthorizedException('No se ha proporcionado un token.')
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException('Formato de token inválido.')
    }
    try {
      const user = this.jwtService.verify(token, {
        secret: this.config.get<string>('JWT_SECRET')
      })
      request.user = user
    } catch {
      throw new UnauthorizedException('Token inválido o expirado.')
    }
    return true
  }
}
