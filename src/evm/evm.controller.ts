import { Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { EvmService } from './evm.service';
import { ParseHexPipe } from '../pipes/parse-hex.pipe';

@Controller('evm')
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Get('block/:height')
  async getBlockByHeight(@Param('height', ParseIntPipe) height: number) {
    return this.evmService.getBlockByHeight(height);
  }

  @Get('transactions/:hash')
  async getTransactionByHash(@Param('hash', ParseHexPipe) hash: string) {
    return this.evmService.getTransactionByHash(hash);
  }
}
