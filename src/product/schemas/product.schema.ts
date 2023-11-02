import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @ApiProperty({ type: String })
  _id: ObjectId;

  @ApiProperty({ type: Number })
  @Prop()
  productCode: number;

  @ApiProperty({ type: Number })
  @Prop()
  price: number;

  @ApiProperty({ type: String })
  @Prop()
  userId: string;

  @ApiProperty({ type: String })
  @Prop()
  description: string;

  @ApiProperty({ type: String })
  @Prop()
  name: string;

  @ApiProperty({ type: Number })
  @Prop()
  quantity: number;

  @ApiProperty({ type: String })
  @Prop()
  category: 'comida' | 'bebida' | 'doce' | 'outros';
}

export const ProductSchema = SchemaFactory.createForClass(Product);
