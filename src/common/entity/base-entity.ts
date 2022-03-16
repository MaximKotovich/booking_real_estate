import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;
}
