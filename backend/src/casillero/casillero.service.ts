import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { UpdateCasilleroDto } from './dto/update-casillero.dto'
import { CasilleroBloque } from './entities/casillero-bloque.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Casillero } from './entities/casillero.entity'
import { Repository } from 'typeorm'
import * as sharp from 'sharp'

@Injectable()
export class CasilleroService {
  /**
   * Constructor.
   *
   * @param bloqueRepository Repository for the {@link CasilleroBloque} entity.
   * @param casilleroRepository Repository for the {@link Casillero} entity.
   */
  constructor(
    @InjectRepository(CasilleroBloque)
    private readonly bloqueRepository: Repository<CasilleroBloque>,
    @InjectRepository(Casillero)
    private readonly casilleroRepository: Repository<Casillero>
  ) {}

  /**
   * Crea un bloque de casilleros.
   *
   * Consulta el procedimiento almacenado `private.crear_bloque_y_casilleros` para
   * crear un bloque de casilleros con su respectiva letra.
   *
   * @param mode Un booleano que indica como se crean los bloques de casilleros. Si
   * `mode` es `true`, se crea el bloque con numeración horizontal.
   * Si `mode` es `false`, se crea el bloque con numeración vertical.
   * @returns Un objeto con una propiedad `message` que contiene un mensaje de
   * confirmacion y una propiedad `data` que contiene el id del bloque recien
   * creado.
   * @throws {BadRequestException} - Si no se pudo crear el bloque.
   */
  public async createBloque(mode: boolean) {
    if (mode === undefined) {
      mode = true
    }
    const result = await this.bloqueRepository.query(
      'SELECT * FROM private.crear_bloque_y_casilleros($1)',
      [mode]
    )
    if (!result || result.length === 0) {
      throw new BadRequestException('No se pudo crear el bloque')
    }
    return result
  }

  /**
   * Obtiene todos los casilleros, con opción de filtrar por letra de bloque.
   *
   * Consulta el servicio para obtener todos los casilleros, pudiendo filtrar
   * por la letra del bloque a través del parámetro `letra`.
   *
   * @param letra - (Opcional) La letra del bloque de casilleros para filtrar.
   * @returns Un objeto JSON con un mensaje de éxito y la lista de casilleros.
   * @throws {NotFoundException} - Si no se encuentran casilleros.
   */
  public async findAllCasilleros(letra?: string) {
    const filter: any = {
      relations: ['bloque'],
      order: { id: 'ASC' }
    }
    if (letra) {
      filter.where = { bloque: { letra } }
    }

    const result = await this.casilleroRepository.find(filter)

    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron casilleros')
    }

    // Transformar el campo comprobante a base64 si existe
    return result.map((casillero) => {
      let comprobanteBase64: string | null = null
      if (casillero.comprobante) {
        comprobanteBase64 = `data:image/webp;base64,${casillero.comprobante.toString('base64')}`
      }
      return {
        ...casillero,
        comprobante: comprobanteBase64
      }
    })
  }

  /**
   * Registra o actualiza un casillero con el identificador proporcionado.
   *
   * Consulta el servicio para asignar o actualizar los datos del casillero
   * especificado por el `id` utilizando la información del `updateCasilleroDto`.
   *
   * @param id - El identificador del casillero a registrar o actualizar.
   * @param updateCasilleroDto - Los datos a actualizar en el casillero.
   *
   * @returns Un objeto JSON con un mensaje de éxito y los datos del
   * casillero registrado o actualizado.
   *
   * @throws {NotFoundException} - Si no se encuentra el casillero.
   * @throws {BadRequestException} - Si la solicitud es inválida o no se
   * puede registrar el casillero.
   */
  public async registerCasillero(
    id: number,
    updateCasilleroDto: UpdateCasilleroDto,
    comprobante?: Express.Multer.File
  ): Promise<{ message: string; result: Casillero }> {
    const casillero = await this.casilleroRepository.findOne({
      where: { id }
    })
    if (!casillero) {
      throw new NotFoundException('No se encontró el casillero')
    }

    let message = 'Actualización exitosa. Datos del casillero actualizados.'
    if (!casillero.ocupado) {
      message = 'Registro exitoso. Casillero asignado correctamente.'
    }

    const actualizedLocker = this.casilleroRepository.merge(
      casillero,
      updateCasilleroDto
    )

    // Procesar el comprobante si existe
    if (comprobante) {
      try {
        // Validar el formato del archivo
        const formatosPermitidos = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/jpg'
        ]

        if (!formatosPermitidos.includes(comprobante.mimetype)) {
          throw new BadRequestException('Formato de imagen no permitido.')
        }

        // Procesar y comprimir la imagen
        const comprobanteBuffer = await sharp(comprobante.buffer)
          .resize(800, 800, { fit: 'inside' })
          .toFormat('webp')
          .webp({ quality: 50 })
          .toBuffer()

        // Asignar el buffer procesado
        actualizedLocker.comprobante = Buffer.from(comprobanteBuffer)
        console.log(
          `Tamaño del comprobante comprimido: ${comprobanteBuffer.length} bytes`
        )
      } catch (error) {
        throw new BadRequestException(
          `Error al procesar el comprobante: ${error.message}`
        )
      }
    }

    actualizedLocker.ocupado = true

    const result = await this.casilleroRepository.save(actualizedLocker)
    if (!result) {
      throw new BadRequestException('No se pudo registrar el casillero')
    }

    // Para evitar enviar el buffer completo en la respuesta
    if (result.comprobante) {
      const resultToReturn: any = { ...result }
      resultToReturn.comprobante = 'comprobante-cargado'
      return { message, result: resultToReturn }
    }

    return { message, result }
  }

  /**
   * Limpia los datos de un casillero específico.
   *
   * Utiliza el repositorio para actualizar el casillero con el identificador
   * proporcionado, desocupándolo y eliminando la información de su propietario.
   *
   * @param id - El identificador del casillero a limpiar.
   * @param registrado_por - La persona que realiza la acción de limpiar el casillero.
   * @returns El resultado de la operación de actualización.
   * @throws {NotFoundException} - Si no se encuentra el casillero.
   * @throws {BadRequestException} - Si no se pudo limpiar el casillero.
   */
  public async clearCasillero(id: number, registrado_por: string) {
    const result = await this.casilleroRepository
      .createQueryBuilder()
      .update(Casillero)
      .set({
        ocupado: false,
        propietario: null,
        correo: null,
        telefono: null,
        registrado_por: registrado_por,
        comprobante: null // Añadido para limpiar el comprobante
      })
      .where('id = :id', { id })
      .execute()

    console.log('result ->', result)
    if (result.affected === 0) {
      throw new NotFoundException('No se encontró el casillero')
    }
    if (!result) {
      throw new BadRequestException('No se pudo limpiar el casillero')
    }
    return result
  }

  /**
   * Limpia los datos de todos los casilleros de un bloque específico.
   *
   * Utiliza el repositorio para actualizar todos los casilleros con la letra
   * del bloque proporcionada, desocupándolos y eliminando la información de su
   * propietario.
   *
   * @param letra - La letra del bloque de casilleros a limpiar.
   * @param registrado_por - La persona que realiza la acción de limpiar el
   * bloque.
   * @returns El resultado de la operación de actualización.
   * @throws {NotFoundException} - Si no se encuentran casilleros para limpiar.
   * @throws {BadRequestException} - Si no se pudo limpiar el bloque.
   */
  public async clearBloque(letra: string, registrado_por: string) {
    const result = await this.casilleroRepository
      .createQueryBuilder()
      .update(Casillero)
      .set({
        ocupado: false,
        propietario: null,
        correo: null,
        telefono: null,
        registrado_por: registrado_por,
        comprobante: null // Añadido para limpiar el comprobante
      })
      .where('bloque IN (SELECT id FROM private.bloque WHERE letra = :letra)', {
        letra
      })
      .execute()

    if (result.affected === 0) {
      throw new NotFoundException('No se encontraron casilleros para limpiar')
    }
    if (!result) {
      throw new BadRequestException('No se pudo limpiar el bloque')
    }
    return result
  }

  /**
   * Obtiene todas las letras de los bloques de casilleros.
   *
   * Consulta el repositorio para obtener todas las letras de los bloques de
   * casilleros.
   *
   * @returns Un objeto JSON con un mensaje de éxito y las letras de los bloques.
   * @throws {NotFoundException} - Si no se encuentran letras de bloques.
   */
  public async findAllLetras() {
    const result = await this.bloqueRepository.find({
      select: ['letra']
    })
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron letras de bloques')
    }
    return result
  }

  /**
   * Elimina un bloque de casilleros con la letra proporcionada.
   *
   * Utiliza el repositorio para eliminar el bloque de casilleros que
   * coincide con la letra especificada.
   *
   * @param letra - La letra del bloque de casilleros a eliminar.
   * @returns El resultado de la operación de eliminación.
   * @throws {NotFoundException} - Si no se encuentra el bloque de casilleros.
   * @throws {BadRequestException} - Si no se puede eliminar el bloque.
   */
  public async deleteBloque(letra: string) {
    const result = await this.bloqueRepository
      .createQueryBuilder()
      .delete()
      .from(CasilleroBloque)
      .where('letra = :letra', { letra })
      .execute()
    if (!result) {
      throw new BadRequestException('No se pudo eliminar el bloque')
    }
    if (result.affected === 0) {
      throw new NotFoundException('No se encontró el bloque')
    }
    return result
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Obtiene la ocupación de los casilleros, agrupados por bloque.
   *
   * Consulta el repositorio para obtener el estado de ocupación de los
   * casilleros, agrupados por bloque. Devuelve un objeto JSON con un mensaje
   * de éxito y los datos de ocupación.
   *
   * @returns Un objeto JSON con un mensaje de éxito y los datos de ocupación.
   * @throws {NotFoundException} - Si no se encuentran datos de ocupación.
   */
  /******  2c723f42-c758-4b1d-9049-6533ae4c3d23  *******/
  public async getOccupancy() {
    const result = await this.casilleroRepository.query(
      `SELECT 
        b.letra AS "bloque",
        COUNT(c.id) AS "casilleros",
        SUM(CASE WHEN c.ocupado THEN 1 ELSE 0 END) AS "ocupados",
        SUM(CASE WHEN NOT c.ocupado THEN 1 ELSE 0 END) AS "libres",
        ROUND(100.0 * SUM(CASE WHEN c.ocupado THEN 1 ELSE 0 END) / COUNT(c.id), 2) AS "ocupacion"
      FROM 
        private.casilleros c
      INNER JOIN 
        private.bloque b ON c.bloque = b.id
      GROUP BY 
        b.letra
      ORDER BY 
        b.letra
      `
    )
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron datos de ocupación')
    }
    return result
  }
}
