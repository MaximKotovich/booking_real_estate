import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ServiceModule } from 'src/service/service.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([]), AuthModule, ServiceModule],
  controllers: [UserController],
  providers: [],
})
export class ControllerModule {}
