import { ConfigModule, DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ReservationModule } from './reservation/reservation.module';
import { SleeperApiController } from './sleeper-api.controller';
import { SleeperApiService } from './sleeper-api.service';
@Module({
  imports: [ConfigModule, DatabaseModule, OrderModule, ReservationModule],
  controllers: [SleeperApiController],
  providers: [SleeperApiService],
})
export class SleeperApiModule {}
