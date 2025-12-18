import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

config()
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: [__dirname + 'dist/db/migrations/*{.ts,.js}'],
    logging: false,
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;