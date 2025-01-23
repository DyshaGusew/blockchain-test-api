import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvmModule } from '../evm/evm.module';
import { CosmosModule } from '../cosmos/cosmos.module';

@Module({
  imports: [EvmModule, CosmosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
