import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    Created_Date: Date;

    @UpdateDateColumn()
    Updated_Date: Date;

    @DeleteDateColumn()
    Deleted_Date: Date | null;
}