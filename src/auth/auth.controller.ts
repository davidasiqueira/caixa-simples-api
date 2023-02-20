import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Query,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './authStrategy/jwt-auth.guard';
import { LocalAuthGuard } from './authStrategy/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/isvalid/')
  async isLogged(@Query('userId') id, @Headers() headers) {
    return await this.authService.validateToken(
      id,
      headers['authorization'].split(' ')[1],
    );
  }
}
