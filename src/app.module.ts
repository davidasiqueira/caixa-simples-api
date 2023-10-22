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
      process.env.MONGO_CONECTION_STRING || 'mongodb://localhost:27017',
    ),
    LancamentosModule,
  ],
})
export class AppModule {}
