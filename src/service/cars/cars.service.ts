import { Injectable } from '@nestjs/common';
import { CarsRequestDto } from 'src/model/cars/cars.dto';
import { Request } from 'express';
// import * as cookieParser from 'cookie-parser';
import jwt_decode from 'jwt-decode';
import { CarsEntity } from '../../common/entity/cars-entity';
import { CarsRepository } from '../../repository/cars/cars.repository';

@Injectable()
export class CarsService {
  constructor(private carsRepository: CarsRepository) {}

  async add(newCarRequestDto: CarsRequestDto, req: Request) {
    const user_id: any = jwt_decode(req.cookies.jwt);
    return this.carsRepository.save({
      ...newCarRequestDto,
      owner: { id: user_id.sub },
    });
  }
}
