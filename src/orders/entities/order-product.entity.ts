import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "src/products/entities/product.entity";

@Entity({ name: 'orderProduct' })
export class OrderProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    productPrice: number;

    @Column()
    productQuantity: number;

    @ManyToOne(() => OrderEntity, (order) => order.products)
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, (pro) => pro.products)
    product: ProductEntity;
}