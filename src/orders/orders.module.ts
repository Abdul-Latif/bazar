import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ShippingsEntity } from './entities/shipping-address.entity';
import { OrderProductEntity } from './entities/order-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ShippingsEntity, OrderProductEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
