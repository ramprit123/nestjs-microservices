import { Controller, Get } from '@nestjs/common';
import { SleeperApiService } from './sleeper-api.service';

@Controller()
export class SleeperApiController {
  constructor(private readonly sleeperApiService: SleeperApiService) {}

  @Get()
  getHello(): string {
    return this.sleeperApiService.getHello();
  }
}
