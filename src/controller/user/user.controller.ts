import { Controller, UseGuards, Body, Post, Req, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response, Request } from 'express';
import {
  UserAuthRequestDto,
  UserRegisterRequestDto,
} from '../../model/user/user-login.dto';
import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, description: 'Registration' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  // @UseGuards(LocalAuthGuard)
  @Post('registration')
  async register(@Body() UserRegisterRequestDto: UserRegisterRequestDto) {
    await this.authService.registration(UserRegisterRequestDto);
    return 'Success';
  }

  @ApiOperation({ summary: 'Authentication' })
  @ApiResponse({ status: 201, description: 'Authentication' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Something wrong' })
  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() userAuthRequestDto: UserAuthRequestDto,
    @Req() req: Request,
    @Res() response: Response,
  ) {
    const token = await this.authService.login(userAuthRequestDto);
    response.cookie('jwt', token.access_token, {
      sameSite: 'none',
      secure: true,
    });
    response.end();
  }
}
