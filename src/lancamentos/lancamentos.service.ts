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

  async findAllByUserId(userId: string) {
    return this.LancamentoModel.find({ userId: userId });
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
