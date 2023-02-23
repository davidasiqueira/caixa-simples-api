import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { Lancamento, LancamentoDocument } from './schemas/lancamento.schema';

@Injectable()
export class LancamentosService {
  constructor(
    @InjectModel(Lancamento.name)
    private LancamentoModel: Model<LancamentoDocument>,
  ) {}
  async create(createLancamentoDto: CreateLancamentoDto): Promise<Lancamento> {
    const CreatedLancamento = new this.LancamentoModel(createLancamentoDto);
    return CreatedLancamento.save();
  }

  async findByPeriod(
    userId: string,
    initialDate = 0,
    finalDate = 999999999999999,
  ) {
    try {
      return await this.LancamentoModel.find({
        $and: [
          { userId: userId },
          {
            $and: [
              { date: { $gte: initialDate } },
              { date: { $lte: finalDate } },
            ],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      await this.LancamentoModel.findByIdAndDelete({ _id: id });
    } catch (err) {
      return err;
    }
    return 'deleted';
  }
}
