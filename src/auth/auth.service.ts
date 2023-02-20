import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/schemas/userSchema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      return this.login(user);
    }
    return null;
  }

  private async login(user: User) {
    const payload = {
      username: user.email,
      Id: user._id,
    };

    const token = await this.jwtService.sign(payload);
    this.saveToken(user._id, token);

    return {
      access_token: token,
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      },
    };
  }

  async saveToken(id: ObjectId, token1: string): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { token: { token: token1, createdAt: Date.now() } } },
    );
  }

  async validateToken(id: ObjectId, token1: string) {
    const user = await this.userModel.findById(id);
    if (user.token.length > 4) {
      this.revokeToken(id);
    }
    const foundToken = user.token.find((obj) => obj.token == token1);
    if (!foundToken) {
      return null;
    } else {
      return { name: user.name, avatar: user.avatar };
    }
  }

  private async revokeToken(id: ObjectId) {
    const expiredData = Date.now() - 86400000;

    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $pull: { token: { createdAt: { $lt: expiredData } } } },
    );
  }
}
