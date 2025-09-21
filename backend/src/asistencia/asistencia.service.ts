import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CreateAsistenciaDto } from './dto/create-asistencia.dto'
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Asistencia } from './entities/asistencia.entity'

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>
  ) {}

  public async createAsistencia(
    createAsistenciaDto: CreateAsistenciaDto,
    userId: string
  ) {
    if (userId !== createAsistenciaDto.usuarioId) {
      throw new ForbiddenException(
        'No tienes permisos para registrar asistencia'
      )
    }
    const user = await this.asistenciaRepository.findOne({
      where: { usuario: { id: createAsistenciaDto.usuarioId } }
    })
    if (!user) {
      throw new NotFoundException('No se encontró el usuario')
    }
    const asistencia = this.asistenciaRepository.create({
      usuario: { id: createAsistenciaDto.usuarioId },
      dia: createAsistenciaDto.dia,
      horaLlegada: createAsistenciaDto.hora_llegada,
      horaSalida: createAsistenciaDto.hora_salida
    })
    if (!asistencia) {
      throw new BadRequestException('Error al registrar asistencia')
    }
    const result = await this.asistenciaRepository.save(asistencia)
    if (!result || result.id === null) {
      throw new BadRequestException('Error al registrar asistencia')
    }
    return result
  }

  public async findAllAsistencias(usuario?: number) {
    const filter: any = {
      relations: ['usuario'],
      order: { dia: 'ASC', hora_llegada: 'ASC', hora_salida: 'ASC' },
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
    const result = await this.asistenciaRepository.find(filter)
    console.log('result', result)
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron asistencias')
    }
    return result
  }

  public async findAsistenciaById(id: number) {
    const result = await this.asistenciaRepository.findOne({
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
      throw new NotFoundException('No se encontró la asistencia')
    }
    return result
  }

  public async updateAsistencia(
    id: number,
    updateAsistenciaDto: UpdateAsistenciaDto
  ) {
    const result = await this.asistenciaRepository.update(
      { id },
      {
        usuario: { id: updateAsistenciaDto.usuarioId },
        dia: updateAsistenciaDto.dia,
        horaLlegada: updateAsistenciaDto.hora_llegada,
        horaSalida: updateAsistenciaDto.hora_salida
      }
    )
    if (!result.affected) {
      throw new NotFoundException('No se encontró la asistencia')
    }
    return result
  }

  public async deleteAsistencia(id: number) {
    const result = await this.asistenciaRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundException('No se encontró la asistencia')
    }
    return result
  }
}
