import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  UserAuthRequestDto,
  UserRegisterRequestDto,
} from '../model/user/user-login.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../service/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.checkLogin(username);
    if (!user) {
      throw new BadRequestException();
    }
    const passFl = await bcrypt.compare(pass, user.pass);
    if (user && passFl) {
      // tslint:disable-next-line:no-shadowed-variable
      const { pass, ...result } = user;
      return result;
    }
    throw new BadRequestException();
  }

  async login(user: UserAuthRequestDto) {
    const candidate = await this.userService.checkLogin(user.login);
    const payload = {
      login: user.login,
      sub: candidate.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(createUser: UserRegisterRequestDto): Promise<number> {
    if (await this.userService.checkLogin(createUser.login)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'user already exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    createUser.pass = await bcrypt.hash(createUser.pass, 12);
    const user = await this.userService.createUser(createUser);
    return user.id;
  }
}
