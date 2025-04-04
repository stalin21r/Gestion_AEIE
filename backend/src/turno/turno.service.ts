import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CreateTurnoDto } from './dto/create-turno.dto'
import { UpdateTurnoDto } from './dto/update-turno.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Turno } from './entities/turno.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TurnoService {
  /**
   * Constructor.
   *
   * @param turnoRepository The repository of the `Turno` entity.
   */
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>
  ) {}

  /**
   * Crea un nuevo turno.
   *
   * @param createTurnoDto El dto que se va a utilizar para crear el turno.
   * @returns El turno creado.
   * @throws {BadRequestException} Si no se puede crear el turno.
   */
  public async createTurno(createTurnoDto: CreateTurnoDto) {
    const turno = this.turnoRepository.create({
      usuario: { id: createTurnoDto.usuario },
      dia: createTurnoDto.dia,
      hora_inicio: createTurnoDto.hora_inicio,
      hora_fin: createTurnoDto.hora_fin
    })
    if (!turno) {
      throw new BadRequestException('Error al registrar turno')
    }
    const result = await this.turnoRepository.save(turno)
    if (!result || result.id === null) {
      throw new BadRequestException('Error al registrar turno')
    }
    return result
  }

  /**
   * Finds all turnos, with an optional filter by usuario.
   *
   * @param usuario - (Optional) The id of the usuario to filter by.
   * @returns A list of all turnos, including the usuario data.
   * @throws {NotFoundException} - If no turnos are found.
   */
  public async findAllTurnos(usuario?: number) {
    const filter: any = {
      relations: ['usuario'],
      order: { dia: 'ASC', hora_inicio: 'ASC', hora_fin: 'ASC' },
      select: {
        usuario: {
          id: true,
          nombre: true,
          apellido: true
        }
      }
    }
    if (usuario) {
      filter.where = { usuario: { id: usuario } }
    }
    const result = await this.turnoRepository.find(filter)
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron turnos')
    }
    return result
  }

  /**
   * Finds a turno by ID.
   *
   * Finds a turno by its ID and returns it, including the usuario data.
   * If no turno is found, throws a `NotFoundException`.
   *
   * @param id - The ID of the turno to find.
   * @returns The found turno, including the usuario data.
   * @throws {NotFoundException} - If no turno is found.
   */
  public async findTurnoById(id: number) {
    const result = await this.turnoRepository.findOne({
      where: { id },
      relations: ['usuario'],
      select: {
        usuario: {
          id: true,
          nombre: true,
          apellido: true
        }
      }
    })
    if (!result) {
      throw new NotFoundException('No se encontró la turno')
    }
    return result
  }

  /**
   * Updates a turno by ID.
   *
   * Updates a turno by its ID using the provided `updateTurnoDto`.
   * If the turno is not found, throws a `NotFoundException`.
   *
   * @param id - The ID of the turno to update.
   * @param updateTurnoDto - The data transfer object containing updated turno details.
   * @returns The updated turno object.
   * @throws {NotFoundException} - If no turno is found.
   */
  public async updateTurno(id: number, updateTurnoDto: UpdateTurnoDto) {
    const result = await this.turnoRepository.update(
      { id },
      {
        usuario: { id: updateTurnoDto.usuario },
        dia: updateTurnoDto.dia,
        hora_inicio: updateTurnoDto.hora_inicio,
        hora_fin: updateTurnoDto.hora_fin
      }
    )
    if (!result.affected) {
      throw new NotFoundException('No se encontró la turno')
    }
    return result
  }

  /**
   * Deletes a turno by its ID.
   *
   * Deletes a turno by its ID and returns the result of the deletion.
   * If the turno is not found, throws a `NotFoundException`.
   *
   * @param id - The ID of the turno to delete.
   * @returns The result of the deletion.
   * @throws {NotFoundException} - If no turno is found.
   */
  public async deleteTurno(id: number) {
    const result = await this.turnoRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundException('No se encontró la turno')
    }
    return result
  }
}
