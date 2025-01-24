import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { ParseHexPipe } from '../pipes/parse-hex.pipe';

@Controller('cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Get('block/:height')
  async getBlockByHeight(@Param('height', ParseIntPipe) height: number,) {
    return this.cosmosService.getBlockByHeight(height);
  }

  @Get('transactions/:hash')
  async getTransactionByHash(@Param('hash', ParseHexPipe) hash: string,) {
    return this.cosmosService.getTransactionByHash(hash);
  }
}