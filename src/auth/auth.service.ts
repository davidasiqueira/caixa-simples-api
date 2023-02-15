import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/userSchema';

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
  private async login(user: User) {
    const payload = {
      username: user.email,
      Id: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      },
    };
  }
}
