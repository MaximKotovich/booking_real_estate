import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarsRequestDto, UpdateCarDto } from '../../model/cars/cars.dto';
import { CarsService } from '../../service/cars/cars.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { WithIdModel } from '../../model/base/withIdModel';

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

  @ApiOperation({ summary: 'Delete car' })
  @ApiResponse({ status: 201, description: 'Car was remove' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async deleteCar(@Param('id') id: number) {
    return this.carsService.deleteCar(id);
  }

  @ApiOperation({ summary: 'Update car' })
  @ApiResponse({ status: 201, description: 'Car was update' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @UseGuards(AuthGuard)
  @Post('/updateCar')
  async updateCar(@Body() updateCar: UpdateCarDto & WithIdModel) {
    return this.carsService.patch(updateCar);
  }

  @ApiOperation({ summary: 'uploadFile' })
  @ApiResponse({ status: 201, description: 'uploadFile' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @UseGuards(AuthGuard)
  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image) {
    return await this.carsService.upload(image);
  }

  @ApiOperation({ summary: 'getCarByUser' })
  @ApiResponse({ status: 201, description: 'getCarByUser' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @UseGuards(AuthGuard)
  @Get('/getCarByUser')
  async getCarByUser(@Req() req: Request) {
    return await this.carsService.getCarByUser(req);
  }

  @ApiOperation({ summary: 'Get car by Id' })
  @ApiResponse({ status: 201, description: 'Get car by Id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @UseGuards(AuthGuard)
  @Get('/getCar/:id')
  async getCarById(@Param('id') id: number) {
    return this.carsService.getCarById(id);
  }
}
