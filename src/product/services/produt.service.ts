import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model, ObjectId } from 'mongoose';
import { ProductDto, UpdateProductDto } from '../dtos/produt.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getByCode(code: number, userId: ObjectId): Promise<Product> {
    return this.productModel.findOne({ productCode: code, userId: userId });
  }

  async getAllProducts(userId: ObjectId): Promise<Product[]> {
    return this.productModel.find({ userId: userId });
  }

  async createProduct(productDto: ProductDto): Promise<Product> {
    const lastProduct = await this.productModel
      .findOne({ userId: productDto.userId })
      .sort({ productCode: -1 })
      .limit(1)
      .exec();

    let nextProductCode = 1;
    if (lastProduct) {
      nextProductCode = lastProduct.productCode + 1;
    }

    const productWithCode = {
      ...productDto,
      productCode: nextProductCode,
    };

    const createdProduct = new this.productModel(productWithCode);
    await createdProduct.save();

    return createdProduct;
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    code: number,
    userId: ObjectId,
  ): Promise<void> {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { productCode: code, userId: userId },
      updateProductDto,
      { new: true },
    );
    if (!updatedProduct) throw new Error('Produto não atualizado');
  }

  async deleteProduct(code: number, userId: ObjectId): Promise<void> {
    await this.productModel.findOneAndDelete({
      productCode: code,
      userId: userId,
    });
  }
}
