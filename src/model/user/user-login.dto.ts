import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterRequestDto {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  pass: string;
}

export class UserAuthRequestDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  pass: string;
}
