import { DataSource } from 'typeorm';
import 'dotenv/config';
import { entities } from './config/entities';

const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST.toString(),
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME.toString(),
  password: process.env.DATABASE_PASSWORD.toString(),
  database: process.env.DATABASE_NAME.toString(),
  entities: entities,
  migrations: [__dirname + '/infrastructure/migrations/*{.ts,.js}'],
  synchronize: false,
});

export default myDataSource;
