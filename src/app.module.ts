import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LancamentosModule } from './lancamentos/lancamentos.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      process.env.MONGO_CONECTION_STRING ||
        'mongodb+srv://david:1GA6Rx77f8APLaDp@cluster0.mpyame7.mongodb.net/?retryWrites=true&w=majority',
    ),
    LancamentosModule,
  ],
})
export class AppModule {}
