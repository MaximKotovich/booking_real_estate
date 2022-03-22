import { BaseEntity } from './base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user-entity';

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
  @Column({
    nullable: true,
  })
  image: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  owner: UserEntity;
}
