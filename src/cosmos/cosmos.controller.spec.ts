import { Test, TestingModule } from '@nestjs/testing';
import { CosmosController } from './cosmos.controller';
import { CosmosService } from './cosmos.service';

describe('CosmosController', () => {
  let controller: CosmosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CosmosController],
      providers: [CosmosService],
    }).compile();

    controller = module.get<CosmosController>(CosmosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
