import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SleeperApiModule } from './sleeper-api.module';

async function bootstrap() {
  const app = await NestFactory.create(SleeperApiModule, {
    logger: ['error'],
  });
  const PORT = Number(process.env.PORT) || 4000;
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(PORT, () => {
    console.log(`Sleeper API is running on port ${PORT}`);
  });
}
bootstrap();
