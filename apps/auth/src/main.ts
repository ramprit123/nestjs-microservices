import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error'],
  });
  app.connectMicroservice({
    transport: 'TCP',
    options: {
      host: process.env.HOST || 'localhost',
      port: parseInt(process.env.PORT || '4001', 10),
    },
  });
  await app.listen(process.env.PORT ?? 4001, '0.0.0.0');
  await app.startAllMicroservices();
  console.log(`Auth service is running on port ${process.env.PORT ?? 4001}`);
}
bootstrap();
