import { PartialType } from '@nestjs/mapped-types';
import { Product } from '../schemas/product.schema';

export class ProductDto extends Product {}

export class UpdateProductDto extends PartialType(Product) {}
