import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const PORT = process.env.PORT || 3002;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);

  console.log(`Server running on port ${PORT}`);
}

bootstrap();
