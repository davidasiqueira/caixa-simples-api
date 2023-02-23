import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Headers,
  Query,
} from '@nestjs/common';
import { LancamentosService } from './lancamentos.service';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/authStrategy/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Lancamentos')
@Controller('lancamentos')
export class LancamentosController {
  constructor(
    private readonly authService: AuthService,
    private readonly lancamentosService: LancamentosService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Body() createLancamentoDto: CreateLancamentoDto,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      createLancamentoDto.userId as any,
      headers['authorization'].split(' ')[1],
    );
    if (isValid) {
      return this.lancamentosService.create(createLancamentoDto);
    } else {
      return;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'userId' })
  @ApiQuery({ name: 'initialDate' })
  @ApiQuery({ name: 'finalDate' })
  @Get('/all/:userId')
  async findAllByUserId(
    @Param('userId') userId,
    @Query('initialDate') initialDate,
    @Query('finalDate') finalDate,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      userId,
      headers['authorization'].split(' ')[1],
    );
    if (isValid) {
      return this.lancamentosService.findByPeriod(
        userId,
        initialDate,
        finalDate,
      );
    } else {
      return;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'userId' })
  @ApiParam({ name: 'id' })
  @Delete(':id/:userId')
  async remove(
    @Param('id') id: string,
    @Param('userId') userId,
    @Headers() headers,
  ) {
    const isValid = await this.authService.validateToken(
      userId,
      headers['authorization'].split(' ')[1],
    );
    if (isValid) {
      return this.lancamentosService.remove(id);
    } else {
      return;
    }
  }
}
