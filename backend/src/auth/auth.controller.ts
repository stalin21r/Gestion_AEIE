import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Response } from 'express'

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  /**
   * Inicia sesión con el usuario y contraseña proporcionados.
   *
   * Si el usuario existe y la contraseña es correcta, devuelve un objeto con el token de acceso JWT.
   *
   * @param authDto - El usuario y contraseña para iniciar sesión.
   * @returns Un objeto con el token de acceso JWT.
   * @throws {NotFoundException} - Si el usuario no existe.
   * @throws {UnauthorizedException} - Si la contraseña es incorrecta.
   * @throws {InternalServerErrorException} - Si ocurre un error inesperado.
   */
  async signIn(@Body() authDto: AuthDto, @Res() res: Response) {
    try {
      const result = await this.authService.signIn(authDto)
      return res.status(HttpStatus.OK).json({
        message: 'Inicio de sesión exitoso',
        token: result
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message
        })
      }

      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: error.message
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al iniciar sesión',
        error: error.message
      })
    }
  }
}
