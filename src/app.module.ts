import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    TodoModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
