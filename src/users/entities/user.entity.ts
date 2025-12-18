import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "../../utilities/common/role-enum";
import { CategoryEntity } from "src/category/entities/category.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { OrderEntity } from "src/orders/entities/order.entity";
import { FavoriteEntity } from "src/favorites/entities/favorite.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ unique: true })
    email: string;
    @Column({ select: false })
    password?: string;
    @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
    roles: Roles[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany(() => CategoryEntity, (cat) => cat.addedBy)
    categories: CategoryEntity[];
    @OneToMany(() => ProductEntity, (prod) => prod.addedBy)
    products: ProductEntity[];

    @OneToMany(() => ReviewEntity, (rev) => rev.user)
    reviews: ReviewEntity[];
    @OneToMany(() => OrderEntity, (order) => order.orderdBy)
    orders: OrderEntity[];

    @OneToMany(() => FavoriteEntity, (fav) => fav.user)
    favorites: FavoriteEntity[];
}
