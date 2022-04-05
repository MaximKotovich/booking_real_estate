import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarsRequestDto } from '../../model/cars/cars.dto';
import { CarsService } from '../../service/cars/cars.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

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

  @ApiOperation({ summary: 'uploadPhotos' })
  @ApiResponse({ status: 201, description: 'uploadPhotos' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  @UseGuards(AuthGuard)
  @Get('/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: any) {
    res.sendFile(filename, {
      root: `${path.resolve(__dirname, '../..', 'static')}`,
    });
  }
}
