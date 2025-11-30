import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "../../utilities/common/role-enum";
import { CategoryEntity } from "src/category/entities/category.entity";

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
}
