import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLSOrdersShippingProductItems1764715789560 implements MigrationInterface {
    name = 'AddTBLSOrdersShippingProductItems1764715789560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shippings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "postCode" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, CONSTRAINT "PK_665fb613135782a598a2b47e5b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('processing', 'shipped', 'cancelled', 'delieverd')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "orderAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."orders_status_enum" NOT NULL DEFAULT 'processing', "shippedAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "orderdById" integer, "shippingId" integer, CONSTRAINT "REL_fa7fbee142ce934fec2862889a" UNIQUE ("shippingId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderProduct" ("id" SERIAL NOT NULL, "productPrice" numeric(10,2) NOT NULL DEFAULT '0', "productQuantity" integer NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "PK_8c89300e91ad0ff68f67e7037a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_868e2880b59b8e4c99278eacd72" FOREIGN KEY ("orderdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_fa7fbee142ce934fec2862889ac" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderProduct" ADD CONSTRAINT "FK_16ed2dd2152e905b788b4302180" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderProduct" ADD CONSTRAINT "FK_7d18d1fafedc1b39c5f2c40c03d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderProduct" DROP CONSTRAINT "FK_7d18d1fafedc1b39c5f2c40c03d"`);
        await queryRunner.query(`ALTER TABLE "orderProduct" DROP CONSTRAINT "FK_16ed2dd2152e905b788b4302180"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_fa7fbee142ce934fec2862889ac"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_868e2880b59b8e4c99278eacd72"`);
        await queryRunner.query(`DROP TABLE "orderProduct"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "shippings"`);
    }

}
