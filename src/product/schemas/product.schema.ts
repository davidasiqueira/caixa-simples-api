import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  _id: ObjectId;

  @Prop()
  productCode: number;

  @Prop()
  price: number;

  @Prop()
  userId: string;

  @Prop()
  description: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
