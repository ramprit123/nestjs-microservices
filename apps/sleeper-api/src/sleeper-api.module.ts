import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SleeperApiController } from './sleeper-api.controller';
import { SleeperApiService } from './sleeper-api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [SleeperApiController],
  providers: [SleeperApiService],
})
export class SleeperApiModule {}
