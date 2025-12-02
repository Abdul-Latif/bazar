import { UserEntity } from 'src/users/entities/user.entity';
import { OrderStatus } from 'src/utilities/common/order-status.enum';
import { Entity, CreateDateColumn, Column, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShippingsEntity } from './shipping-address.entity';
import { OrderProductEntity } from './order-product.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    orderAt: Date;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
    status: string;

    @Column({ nullable: true })
    shippedAt: Date;

    @Column({ nullable: true })
    deliveredAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    orderdBy: UserEntity;

    @OneToOne(() => ShippingsEntity, (ship) => ship.order, { cascade: true })
    @JoinColumn()
    shipping: ShippingsEntity;

    @OneToMany(() => OrderProductEntity, (op) => op.order, { cascade: true })
    products: OrderProductEntity[];





}
