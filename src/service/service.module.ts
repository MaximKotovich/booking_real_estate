import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserRepository } from '../repository/user/user.repository';
import { UserEntity } from '../common/entity/user-entity';
import { CarsEntity } from '../common/entity/cars-entity';
import { CarsRepository } from '../repository/cars/cars.repository';
import { CarsService } from './cars/cars.service';
import { CarPhotosEntity } from '../common/entity/car-photos-entity';
import { CarPhotoRepository } from '../repository/cars/car-photo.repository';
import { CarFileService } from './cars/car-file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserEntity,
      CarsEntity,
      CarsRepository,
      CarPhotosEntity,
      CarPhotoRepository,
    ]),
  ],
  providers: [UserService, CarsService, CarFileService],
  exports: [UserService, CarsService, CarFileService],
})
export class ServiceModule {}
