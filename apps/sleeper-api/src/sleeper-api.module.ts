import { ConfigModule, DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { SleeperApiController } from './sleeper-api.controller';
import { SleeperApiService } from './sleeper-api.service';
@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [SleeperApiController],
  providers: [SleeperApiService],
})
export class SleeperApiModule {}
