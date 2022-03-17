import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserRepository } from '../repository/user/user.repository';
import { UserEntity } from '../common/entity/user-entity';
import { CarsEntity } from '../common/entity/cars-entity';
import { CarsRepository } from '../repository/cars/cars.repository';
import { CarsService } from './cars/cars.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserEntity,
      CarsEntity,
      CarsRepository,
    ]),
  ],
  providers: [UserService, CarsService],
  exports: [UserService, CarsService],
})
export class ServiceModule {}
