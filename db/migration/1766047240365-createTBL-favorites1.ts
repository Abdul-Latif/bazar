import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTBLFavorites11766047240365 implements MigrationInterface {
    name = 'CreateTBLFavorites11766047240365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "Created_Date" TIMESTAMP NOT NULL DEFAULT now(), "Updated_Date" TIMESTAMP NOT NULL DEFAULT now(), "Deleted_Date" TIMESTAMP, "userId" integer, "productId" integer, CONSTRAINT "UQ_783e5111df14529ff6124351b16" UNIQUE ("userId", "productId"), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_0c7bba48aac77ad13092685ba5b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_0c7bba48aac77ad13092685ba5b"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
