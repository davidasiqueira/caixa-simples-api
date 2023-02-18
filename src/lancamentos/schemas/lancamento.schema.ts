import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/users/schemas/userSchema';

export type UserDocument = HydratedDocument<Lancamento>;

@Schema()
export class Lancamento {
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  value: number;

  @Prop()
  account: string;
  //fazer enum

  @Prop()
  description: string;

  @Prop()
  data: number;
}

export const UserSchema = SchemaFactory.createForClass(Lancamento);
