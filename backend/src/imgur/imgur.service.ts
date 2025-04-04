import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Express } from 'express'
import * as FormData from 'form-data'
import axios from 'axios'
import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ImgurService {
  constructor(
    private readonly datasource: DataSource,
    private readonly configService: ConfigService
  ) {}

  async uploadImage(file: Express.Multer.File, title: string) {
    const formData = new FormData()
    const token = await this.datasource.manager.query(
      `Select token from private.external_services where service_name = 'IMGUR_ACCESS_TOKEN'`
    )

    if (!token || token.length === 0) {
      throw new NotFoundException('No se ha encontrado el token de imgur')
    }

    // Añadimos la imagen como base64
    const imageBase64 = file.buffer.toString('base64')
    formData.append('image', imageBase64)
    formData.append('type', 'base64')
    formData.append('title', title)

    try {
      const response = await axios.post(
        'https://api.imgur.com/3/image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token[0].token}`,
            ...formData.getHeaders()
          }
        }
      )

      if (response.status < 200 || response.status >= 300) {
        console.error('Error al subir imagen:', response.data)
        throw new BadRequestException(
          `Imgur API error: ${response.data.data?.error || 'Unknown error'}`
        )
      }

      return {
        link: response.data.data.link,
        deletehash: response.data.data.deletehash
      }
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Imgur API error: ${error.response.data.data?.error || 'Unknown error'}`
        )
      } else if (error.request) {
        throw new Error('No se recibió respuesta del servidor de Imgur')
      } else {
        throw error
      }
    }
  }

  async deleteImage(deletehash: string) {
    const ClientID = this.configService.get('IMGUR_CLIENT_ID')
    try {
      const response = await axios.delete(
        `https://api.imgur.com/3/image/${deletehash}`,
        {
          headers: {
            Authorization: `Client-ID ${ClientID}`
          }
        }
      )
      if (response.status < 200 || response.status >= 300) {
        console.error('Error al borrar imagen:', response.data)
        throw new BadRequestException(
          `Imgur API error: ${response.data.data?.error || 'Unknown error'}`
        )
      }
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Imgur API error: ${error.response.data.data?.error || 'Unknown error'}`
        )
      } else if (error.request) {
        throw new Error('No se recibió respuesta del servidor de Imgur')
      } else {
        throw error
      }
    }
  }
}
