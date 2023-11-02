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
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The id of the user',
  })
  @Get('one/:code/:userId')
  async getProductByCode(
    @Param('code') code: string,
    @Param('userId') userId,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      userId,
      headers['authorization'].split(' ')[1],
    );
    if (!isValid)
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');

    const product = await this.productService.getByCode(Number(code), userId);
    if (!product) return res.status(HttpStatus.NOT_FOUND).json({});
    return res.status(HttpStatus.OK).json(product);
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The id of the user',
  })
  @Get('/all/:userId')
  async getAllProducts(
    @Param('userId') userId,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      userId,
      headers['authorization'].split(' ')[1],
    );
    if (!isValid)
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
    const products = await this.productService.getAllProducts(userId);
    if (!products) return res.status(HttpStatus.NOT_FOUND).json({});
    return res.status(HttpStatus.OK).json(products);
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The id of the user',
  })
  @Post(':userId')
  async createProduct(
    @Body() productDto: ProductDto,
    @Res() res: Response,
    @Param('userId') userId,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      userId,
      headers['authorization'].split(' ')[1],
    );
    if (!isValid)
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');

    await this.productService.createProduct(productDto);
    return res.status(HttpStatus.OK).send();
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'code',
    required: true,
    description: 'The code of the product',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The id of the user',
  })
  @Patch(':code/:userId')
  async updateProduct(
    @Param('code') code: string,
    @Param('userId') userId,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      userId,
      headers['authorization'].split(' ')[1],
    );
    if (!isValid)
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');

    await this.productService.updateProduct(
      updateProductDto,
      Number(code),
      userId,
    );
    return res.status(HttpStatus.OK).send();
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The id of the user',
  })
  @ApiParam({
    name: 'code',
    required: true,
    description: 'The code of the product',
  })
  @Delete(':code/:userId')
  async deleteProduct(
    @Param('code') code: string,
    @Param('userId') userId,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      userId,
      headers['authorization'].split(' ')[1],
    );
    if (!isValid)
      return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');

    await this.productService.deleteProduct(Number(code), userId);
    return res.status(HttpStatus.OK).send();
  }
}
