import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTBLFavorites21766047925062 implements MigrationInterface {
    name = 'CreateTBLFavorites21766047925062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "UQ_783e5111df14529ff6124351b16"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "UQ_783e5111df14529ff6124351b16" UNIQUE ("userId", "productId")`);
    }

}
