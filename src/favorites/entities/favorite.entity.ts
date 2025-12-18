import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity } from "src/utilities/base-entity";
import { Entity, ManyToOne, Unique } from "typeorm";

// @Unique(['user', 'product'])
@Entity('favorites')
export class FavoriteEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (user) => user.favorites, { onDelete: 'CASCADE' })
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (prod) => prod.favorites, { onDelete: 'CASCADE' })
    product: ProductEntity;
}
