import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity({ name: 'shippings' })
export class ShippingsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    postCode: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @OneToOne(() => OrderEntity, (order) => order.shipping)
    order: OrderEntity;


}