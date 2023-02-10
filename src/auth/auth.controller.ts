import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private usersService: UsersService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  //refatorar pq assim tendo um token valido tenho acesso aos dados de todos os usuários
  //mexer quando terminar de implementtar o backend e afins
  @UseGuards(JwtAuthGuard)
  @Get('auth/isvalid/')
  async isLogged(@Query('userId') id) {
    console.dir(id)
    const user = await this.usersService.findOneById(id);
    return user;
  }
}
