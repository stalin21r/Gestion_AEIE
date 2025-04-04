import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  private readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/png',
    'image/apng',
    'image/tiff'
  ]

  transform(file: Express.Multer.File) {
    // Si no hay archivo, no hacemos validación
    if (!file) {
      return file
    }
    // Verificar el tipo MIME
    if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de archivo no permitido. Los tipos permitidos son: ${this.ALLOWED_MIME_TYPES.map((type) => type.replace('image/', '')).join(', ')}`
      )
    }
    // También podríamos verificar el tamaño máximo del archivo si es necesario
    // if (file.size > MAX_FILE_SIZE) {
    //   throw new BadRequestException(`El archivo es demasiado grande. Tamaño máximo: ${MAX_FILE_SIZE / 1024 / 1024} MB`);
    // }
    return file
  }
}
