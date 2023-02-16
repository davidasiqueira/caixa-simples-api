import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dtos/user.dto';
import { User, UserDocument } from './schemas/userSchema';

@Injectable()
export class UsersService {
  //fazer o crud do mongo e afins
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async save(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findOneById(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
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
      return;
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
