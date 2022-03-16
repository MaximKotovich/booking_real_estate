import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserRepository } from '../repository/user/user.repository';
import { UserEntity } from '../common/entity/user-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class ServiceModule {}
