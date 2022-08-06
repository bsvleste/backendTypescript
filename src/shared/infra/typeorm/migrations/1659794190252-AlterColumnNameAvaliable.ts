import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterColumnNameAvaliable1659794190252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.renameColumn('cars','available','avaliable')
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.renameColumn('cars','avaliable','available')
    }

}
