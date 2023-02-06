import { Module } from '@nestjs/common';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [LancamentosModule, AuthModule, UsersModule],
})
export class AppModule {}
