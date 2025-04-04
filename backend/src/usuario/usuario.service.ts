import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { hash } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Usuario } from './entities/usuario.entity'
import { Repository } from 'typeorm'
@Injectable()
export class UsuarioService {
  /**
   * Creates an instance of UsuarioService.
   *
   * @param usuarioRepository The repository of the `Usuario` entity used to perform database operations.
   */
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  /**
   * Creates a new user in the database.
   *
   * Hashes the provided password and creates a new `Usuario` entity.
   * If the creation fails, throws a `BadRequestException`.
   *
   * @param createUsuarioDto The data transfer object to create the user.
   * @returns The created user, without the password.
   * @throws {BadRequestException} - If the user creation fails.
   */
  public async createUsuario(createUsuarioDto: CreateUsuarioDto) {
    const user = createUsuarioDto
    user.contrasena = await hash(user.contrasena, 10)
    const result = await this.usuarioRepository.save(user)
    if (!result) {
      throw new BadRequestException('No se pudo crear el usuario')
    }
    return result
  }

  /**
   * Finds all users.
   *
   * Returns a list of all users, excluding password.
   * If no users are found, throws a `NotFoundException`.
   *
   * @returns A list of all users.
   * @throws {NotFoundException} - If no users are found.
   */
  async findUsuarios() {
    const result = await this.usuarioRepository.find({
      select: {
        contrasena: false
      }
    })
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron usuarios')
    }
    return result
  }

  /**
   * Finds a user by ID.
   *
   * Returns a user object matching the `id` parameter.
   * If no user is found, throws a `NotFoundException`.
   *
   * @param id - The ID of the user to find.
   * @returns The user.
   * @throws {NotFoundException} - If no user is found.
   */
  public async findUsuarioById(id: number) {
    const result = await this.usuarioRepository.findOne({ where: { id: id } })
    if (!result) {
      throw new NotFoundException('No se encontró el usuario')
    }
    return result
  }

  /**
   * Updates a user by their ID.
   *
   * Retrieves the user with the specified `id` from the repository and updates their details
   * using the provided `updateUsuarioDto`. If the password is being updated, it is hashed before saving.
   * If the user is not found, throws a `NotFoundException`.
   * If the update fails, throws a `BadRequestException`.
   *
   * @param id - The ID of the user to update.
   * @param updateUsuarioDto - The data transfer object containing updated user details.
   * @returns The updated user object, excluding the password.
   * @throws {NotFoundException} - If the user with the specified ID is not found.
   * @throws {BadRequestException} - If the user update fails.
   */
  public async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } })
    if (!usuario) {
      throw new NotFoundException(`No se encontró el usuario con ID ${id}`)
    }
    if (updateUsuarioDto.contrasena) {
      updateUsuarioDto.contrasena = await hash(updateUsuarioDto.contrasena, 10)
    }
    const usuarioActualizado = this.usuarioRepository.merge(
      usuario,
      updateUsuarioDto
    )
    if (!usuarioActualizado) {
      throw new BadRequestException('No se pudo actualizar el usuario')
    }
    const response = await this.usuarioRepository.save(usuarioActualizado)
    if (!response) {
      throw new BadRequestException('No se pudo actualizar el usuario')
    }
    const result = { ...response, contrasena: undefined }
    return result
  }

  /**
   * Deletes a user by their ID.
   *
   * Removes the user with the specified `id` from the repository. If the user is not found, throws a `NotFoundException`.
   * If the deletion fails, throws a `BadRequestException`.
   *
   * @param id - The ID of the user to delete.
   * @returns The result of the deletion.
   * @throws {NotFoundException} - If the user with the specified ID is not found.
   * @throws {BadRequestException} - If the user deletion fails.
   */
  public async deleteUsuario(id: number) {
    const result = await this.usuarioRepository.delete(id)
    if (!result || result.affected === 0) {
      throw new BadRequestException('No se pudo eliminar el usuario')
    }
    return result
  }
}
