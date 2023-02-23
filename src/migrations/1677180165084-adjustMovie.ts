import { MigrationInterface, QueryRunner } from "typeorm";

export class adjustMovie1677180165084 implements MigrationInterface {
    name = 'adjustMovie1677180165084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "deleteAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "deleteAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
