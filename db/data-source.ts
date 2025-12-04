import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL, // Railway DATABASE_URL
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migration/*{.ts,.js}'],
    logging: true,
    synchronize: false,
});

export default dataSource;
