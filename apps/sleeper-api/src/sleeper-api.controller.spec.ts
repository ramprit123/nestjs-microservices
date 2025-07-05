import { Test, TestingModule } from '@nestjs/testing';
import { SleeperApiController } from './sleeper-api.controller';
import { SleeperApiService } from './sleeper-api.service';

describe('SleeperApiController', () => {
  let sleeperApiController: SleeperApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SleeperApiController],
      providers: [SleeperApiService],
    }).compile();

    sleeperApiController = app.get<SleeperApiController>(SleeperApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sleeperApiController.getHello()).toBe('Hello World!');
    });
  });
});
