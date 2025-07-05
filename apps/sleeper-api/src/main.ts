import { NestFactory } from '@nestjs/core';
import { SleeperApiModule } from './sleeper-api.module';

async function bootstrap() {
  const app = await NestFactory.create(SleeperApiModule, {
    logger: ['error'],
  });
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Sleeper API is running on port ${PORT}`);
  });
}
bootstrap();
