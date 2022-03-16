import { BaseEntity } from './base-entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  login: string;

  @ApiProperty()
  @Column()
  pass: string;
}
