import { ApiProperty } from '@nestjs/swagger';

export class WithIdModel {
  @ApiProperty()
  id: number;
}
