import { Test, TestingModule } from '@nestjs/testing';
import { EvmController } from './evm.controller';
import { EvmService } from './evm.service';

describe('EvmController', () => {
  let controller: EvmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvmController],
      providers: [EvmService],
    }).compile();

    controller = module.get<EvmController>(EvmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
