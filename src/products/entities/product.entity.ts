import { CategoryEntity } from 'src/category/entities/category.entity';
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';
import { OrderProductEntity } from 'src/orders/entities/order-product.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Entity } from 'typeorm';
@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    discription: string;
    @Column()
    stock: number;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;
    @Column('simple-array')
    images: string[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @ManyToOne(() => UserEntity, (user) => user.products)
    addedBy: UserEntity;
    @ManyToOne(() => CategoryEntity, (cat) => cat.products)
    category: CategoryEntity;

    @OneToMany(() => ReviewEntity, (rev) => rev.product)
    reviews: ReviewEntity[];

    @OneToMany(() => OrderProductEntity, (op) => op.product)
    products: OrderProductEntity[];

    @OneToMany(() => FavoriteEntity, (fav) => fav.product)
    favorites: FavoriteEntity[];
}
