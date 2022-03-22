import { ApiProperty } from '@nestjs/swagger';

export class CarsRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  secondName: string;

  @ApiProperty()
  year: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  image?: string | null;
}

export class CarPhotos {
  @ApiProperty()
  image: string;
}
