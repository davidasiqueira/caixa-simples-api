import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Query,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './authStrategy/jwt-auth.guard';

import { LocalAuthGuard } from './authStrategy/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private usersService: UsersService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/isvalid/')
  async isLogged(@Query('userId') id, @Headers() headers) {
    const userInfo = await this.usersService.validateToken(
      id,
      headers['authorization'].split(' ')[1],
    );
    if (!userInfo) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return userInfo;
  }
}
