import { Module } from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { LancamentosController } from './lancamentos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lancamento, LancamentoSchema } from './schemas/lancamento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lancamento.name, schema: LancamentoSchema },
    ]),
  ],
  controllers: [LancamentosController],
  providers: [LancamentosService],
})
export class LancamentosModule {}
