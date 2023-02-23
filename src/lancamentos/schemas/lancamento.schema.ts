import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type LancamentoDocument = HydratedDocument<Lancamento>;

@Schema()
export class Lancamento {
  _id: ObjectId;

  @Prop()
  userId: string;

  @Prop()
  value: number;

  @Prop()
  account: string;
  //fazer enum

  @Prop()
  description: string;

  @Prop()
  movimento: string;

  @Prop()
  date: number;
}

export const LancamentoSchema = SchemaFactory.createForClass(Lancamento);
