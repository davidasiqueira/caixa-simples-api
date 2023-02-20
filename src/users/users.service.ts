import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dtos/user.dto';
import { User, UserDocument } from './schemas/userSchema';

@Injectable()
export class UsersService {
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

}
