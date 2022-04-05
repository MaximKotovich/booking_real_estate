import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { CarsEntity } from './cars-entity';

@Entity({ name: 'car_photos' })
export class CarPhotosEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  profileImage: string;

  @ApiProperty()
  @ManyToOne(() => CarsEntity, (car) => car.id, {
    onDelete: 'CASCADE',
  })
  car: CarsEntity;
}
