import { MikroORM } from '@mikro-orm/core';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await runMigrations(app);
  await app.listen(3000);
}

/** Run MikroORM migrations when app starts */
async function runMigrations(app: INestApplication): Promise<void> {
  const orm = app.get(MikroORM);
  const migrator = orm.getMigrator();
  await migrator.up();
}
bootstrap();
