import { Injectable } from '@nestjs/common';
import { CarsRequestDto } from 'src/model/cars/cars.dto';
import { Request } from 'express';
import jwt_decode from 'jwt-decode';
import { CarsRepository } from '../../repository/cars/cars.repository';
import { UserRepository } from '../../repository/user/user.repository';
import { CarFileService } from './car-file.service';

@Injectable()
export class CarsService {
  constructor(
    private carsRepository: CarsRepository,
    private userRepository: UserRepository,
    private carFileService: CarFileService,
  ) {}

  async add(newCarRequestDto: CarsRequestDto, req: Request, image: string) {
    const user_id: any = jwt_decode(req.cookies.jwt);
    const fileName = await this.carFileService.createFile(image);
    return this.carsRepository.save({
      ...newCarRequestDto,
      image: fileName,
      owner: { id: user_id.sub },
    });
  }

  async getCarByUser(req: Request) {
    const user_id: any = jwt_decode(req.cookies.jwt);
    return await this.carsRepository
      .createQueryBuilder('cars')
      .select(['cars.id', 'cars.name', 'cars.price', 'owner.id', 'owner.name'])
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
