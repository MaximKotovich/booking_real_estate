import { Injectable } from '@nestjs/common';
import { CarsRequestDto } from 'src/model/cars/cars.dto';
import { Request } from 'express';
import jwt_decode from 'jwt-decode';
import { CarsRepository } from '../../repository/cars/cars.repository';
import { UserRepository } from '../../repository/user/user.repository';
import { CarFileService } from './car-file.service';
import { CarPhotoRepository } from '../../repository/cars/car-photo.repository';
import * as fs from 'fs';
import { CarsEntity } from '../../common/entity/cars-entity';

@Injectable()
export class CarsService {
  constructor(
    private carsRepository: CarsRepository,
    private userRepository: UserRepository,
    private carFileService: CarFileService,
    private fileImageRepository: CarPhotoRepository,
  ) {}

  async add(newCarRequestDto: CarsRequestDto, req: Request) {
    const user_id: any = jwt_decode(req.cookies.jwt);

    const newCar = new CarsEntity();
    newCar.name = newCarRequestDto.name;
    newCar.secondName = newCarRequestDto.secondName;
    newCar.year = newCarRequestDto.year;
    newCar.price = newCarRequestDto.price;
    newCar.price = newCarRequestDto.price;

    const savedCar = await this.carsRepository.save({
      ...newCar,
      owner: { id: user_id.sub },
    });

    for (const el of newCarRequestDto.images) {
      await this.fileImageRepository.save({
        car: { id: savedCar.id },
        profileImage: el,
      });
    }

    return await this.carsRepository.findOne(savedCar.id, {
      relations: ['images', 'owner'],
    });
  }

  async upload(image) {
    try {
      return `http://localhost:3000/${await this.carFileService.createFile(
        image,
      )}`;
    } catch (e) {
      console.log(e);
    }
  }

  async getCarByUser(req: Request) {
    const user_id: any = jwt_decode(req.cookies.jwt);
    return await this.carsRepository
      .createQueryBuilder('cars')
      .innerJoin('cars.owner', 'owner')
      .where('cars.owner = :id', { id: user_id.sub })
      .getMany();

    // .select('roles.role')
    // .innerJoin('roles.users', 'user_roles')
    // .where('user_roles.id = :id', { id })
    // .getMany();
    // return await this.carsRepository.find({
    //   select: ['owner.id'],
    //   where: { owner: user_id.sub },
    //   relations: ['owner'],
    // });
  }

  async uploadCarPhoto(uploadDto) {
    console.log(uploadDto);
  }
}
