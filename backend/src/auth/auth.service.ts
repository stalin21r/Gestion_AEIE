import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Usuario } from '../usuario/entities/usuario.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { compare } from 'bcrypt'
import { AuthDto } from './dto/auth.dto'
@Injectable()
export class AuthService {
  /**
   * Constructor.
   *
   * @param usuarioRepository The repository of the `Usuario` entity.
   * @param config The service that provides configuration values.
   * @param jwt The service that provides jwt functions.
   */
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly config: ConfigService,
    private readonly jwt: JwtService
  ) {}

  /**
   * Authenticates a user using their credentials.
   *
   * @param authDto - Object containing user credentials for authentication.
   * @throws NotFoundException - If the user is not found in the database.
   * @throws UnauthorizedException - If the provided password is incorrect.
   * @returns A signed JWT token upon successful authentication.
   */

  public async signIn(authDto: AuthDto) {
    const result = await this.usuarioRepository.query(
      'SELECT * FROM private.login_usuario($1)',
      [authDto.user]
    )
    if (!result || result.length === 0) {
      throw new NotFoundException('Usuario no encontrado')
    }
    const user: Usuario = result[0]
    const isPasswordValid = await compare(authDto.password, user.contrasena)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña Incorrecta')
    }
    const signedToken = await this.signToken(
      user.id,
      user.nombre,
      user.apellido,
      user.rol
    )
    return signedToken
  }

  /**
   * Genera un token JWT para el usuario autenticado.
   *
   * @param userId Identificador del usuario autenticado.
   * @param name Nombre del usuario autenticado.
   * @param lastname Apellido del usuario autenticado.
   * @param rol Indica si el usuario autenticado tiene rol de administrador o no.
   * @returns Un token JWT que contiene el identificador del usuario,
   *          su nombre, apellido y rol.
   */
  private async signToken(
    userId: number,
    name: string,
    lastname: string,
    rol: boolean
  ): Promise<string> {
    const payload = { userId, name, lastname, rol }
    const secret = this.config.get<string>('JWT_SECRET')
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '3h',
      secret: secret
    })
    return token
  }
}
