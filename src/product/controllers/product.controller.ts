import {
  Controller,
  Param,
  Get,
  Body,
  Patch,
  Post,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ProductService } from '../services/produt.service';
import { ProductDto, UpdateProductDto } from '../dtos/produt.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/authStrategy/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'code',
    required: true,
    description: 'The code of the product',
  })
  @Get(':code')
  async getProductByCode(
    @Param('code') code: string,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      null,
      headers['authorization'].split(' ')[1],
    );
    if (!isValid)
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');

    const product = await this.productService.getByCode(Number(code));
    if (!product) return res.status(HttpStatus.NOT_FOUND).json({});
    return res.status(HttpStatus.FOUND).json(product);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(
    @Body() productDto: ProductDto,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      null,
      headers['authorization'].split(' ')[1],
    );
    if (!isValid)
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');

    await this.productService.createProduct(productDto);
    return res.status(HttpStatus.CREATED).send();
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'code',
    required: true,
    description: 'The code of the product',
  })
  @Patch(':code')
  async updateProduct(
    @Param('code') code: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      null,
      headers['authorization'].split(' ')[1],
    );
    if (!isValid)
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');

    await this.productService.updateProduct(updateProductDto, Number(code));
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'code',
    required: true,
    description: 'The code of the product',
  })
  @Delete(':code')
  async deleteProduct(
    @Param('code') code: string,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      null,
      headers['authorization'].split(' ')[1],
    );
    if (!isValid)
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');

    await this.productService.deleteProduct(Number(code));
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
