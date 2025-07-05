import { Injectable } from '@nestjs/common';

@Injectable()
export class SleeperApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
