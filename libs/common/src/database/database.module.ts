import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { AbstractRepository } from './abstract.repository';
import { AbstractDocument } from './abstract.document';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const uri = config.get<string>('MONGODB_URI');
        return {
          uri,
        };
      },
    }),
    ConfigModule,
  ],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
