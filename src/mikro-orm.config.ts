import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { Todo } from './todo/entities/todo.entity';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [Todo],
  dbName: 'newabc',
  type: 'postgresql',
  port: 5432,
  debug: true,
  host: 'localhost',
  user: 'postgres',
  password: 'postba123@',
  logger: logger.log.bind(logger),
};

export default config;