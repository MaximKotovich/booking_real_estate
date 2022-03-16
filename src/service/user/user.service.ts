import { Injectable } from '@nestjs/common';
import { UserAuthRequestDto } from '../../model/user/user-login.dto';
import { UserEntity } from '../../common/entity/user-entity';
import { UserRepository } from '../../repository/user/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(createUser: UserAuthRequestDto) {
    const user = new UserEntity();
    user.name = createUser.name;
    user.login = createUser.login;
    user.pass = createUser.pass;

    const savedUser = this.userRepository.save(user);
    return savedUser;
  }

  async checkLogin(login: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ login });
  }
}
