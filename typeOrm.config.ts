import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from './src/config/entities';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST.toString(),
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME.toString(),
  password: process.env.DATABASE_PASSWORD.toString(),
  database: process.env.DATABASE_NAME.toString(),
  entities: entities,
  synchronize: false,
  migrations: [__dirname + '/infrastructure/database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
