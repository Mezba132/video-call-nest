import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let port = 5000;
  app.listen(port, () => {
    console.log('-----------------------------------------------');
    console.log('App is running on port 5000');
    console.log('-----------------------------------------------');
  });
}

bootstrap();
