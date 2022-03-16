import { ApiProperty } from '@nestjs/swagger';

export class UserAuthRequestDto {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  pass: string;
}
