import { BaseEntity } from './base-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user-entity';
import { CarPhotosEntity } from './car-photos-entity';

@Entity({ name: 'cars' })
export class CarsEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  secondName: string;

  @ApiProperty()
  @Column()
  year: string;

  @ApiProperty()
  @Column()
  price: string;

  @ApiProperty()
  @OneToMany(() => CarPhotosEntity, (carPhoto) => carPhoto.car)
  images: CarPhotosEntity[];
  // @ApiProperty()
  // @Column('text', { array: true })
  // images: string[];

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  owner: UserEntity;
}
