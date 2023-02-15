import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Query,
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
    //salvar o token no banco token + timestamp
    //implementar cron de remover os tokens antigos que não estão válidos
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/isvalid/')
  async isLogged(@Query('userId') id) {
    const user = await this.usersService.findOneById(id);
    //vou ter que validar aqui se o token pertence ao usuário informado
    return user;
  }
}
