import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CarsRequestDto } from '../../model/cars/cars.dto';
import { CarsService } from '../../service/cars/cars.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @ApiOperation({ summary: 'addCar' })
  @ApiResponse({ status: 201, description: 'addCar' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @UseGuards(AuthGuard)
  @Post('/addCar')
  async addCar(@Body() newCarRequestDto: CarsRequestDto, @Req() req: Request) {
    return await this.carsService.add(newCarRequestDto, req);
  }
}
