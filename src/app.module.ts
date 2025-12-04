import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '../db/data-source';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './utilities/middlewares/current-user.middleware';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migration/*{.ts,.js}'],
    synchronize: false,
    logging: true,
  }), UsersModule, CategoryModule, ProductsModule, ReviewsModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
