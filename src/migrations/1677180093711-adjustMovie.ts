import { MigrationInterface, QueryRunner } from "typeorm";

export class adjustMovie1677180093711 implements MigrationInterface {
    name = 'adjustMovie1677180093711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "teste"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "teste" boolean NOT NULL`);
    }

}
