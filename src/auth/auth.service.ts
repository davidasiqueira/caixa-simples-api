import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      return this.login(user);
    }
    return null;
  }

  //aqui que meche no retorno do /auth
  private async login(user: any) {
    const payload = {
      username: user.username,
      userId: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userId: user.userId,
        avatar: user.avatar,
        username: user.username,
      },
    };
  }
}
