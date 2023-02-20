import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Query,
  Headers,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './authStrategy/jwt-auth.guard';
import { LocalAuthGuard } from './authStrategy/local-auth.guard';
import { LoginDto } from './swaggerDtos/loginDto';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() body: LoginDto) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'userId' })
  @Get('auth/isvalid/')
  async isLogged(@Query('userId') id, @Headers() headers) {
    return await this.authService.validateToken(
      id,
      headers['authorization'].split(' ')[1],
    );
  }
}
