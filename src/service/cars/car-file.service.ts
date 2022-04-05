import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { CarPhotoRepository } from '../../repository/cars/car-photo.repository';

@Injectable()
export class CarFileService {
  constructor(private fileImageRepository: CarPhotoRepository) {}

  async createFile(image): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('src/common', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), image.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'error file load',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addCarId(carId, fileName) {
    const image = await this.fileImageRepository.findOne({
      profileImage: fileName,
    });
    await this.fileImageRepository.update(image.id, { car: carId });
  }
}
