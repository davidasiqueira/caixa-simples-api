import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'davidsiqueira.hog@gmail.com',
      password: '1234567890',
      avatar: 'https://github.com/davidasiqueira.png',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      avatar: 'https://github.com/davidasiqueira.png',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  async findOneById(id: string): Promise<User | undefined> {
    const { username, avatar } = this.users.find(
      (user) => user.userId === Number(id),
    );
    return { username, avatar };
  }
}
