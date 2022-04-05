import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './common/entity/user-entity';
import { ControllerModule } from './controller/controller.module';
import { CarsEntity } from './common/entity/cars-entity';
import { CarPhotosEntity } from './common/entity/car-photos-entity';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [UserEntity, CarsEntity, CarPhotosEntity],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('src/common', 'static'),
    }),
    ConfigModule.forRoot(),
    ControllerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
