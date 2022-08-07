import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateSpecificationsCars1659817247218 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name:"specification_cars",
          columns: [
            {
            name:"car_id",
            type:"uuid",
          },
          {
              name:"specification_id",
              type:"uuid"
          },
          {
              name:"created_at",
              type:"timestamp",
              default:"now()",
        }]
        })
      )
        await queryRunner.createForeignKey(
          "specification_cars",
          new TableForeignKey({
            name:"FKSpecificationsCar",
            referencedTableName: "specification",
            referencedColumnNames: ["id"],
            columnNames: ["specification_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
          })
        )
        await queryRunner.createForeignKey(
          "specification_cars",
          new TableForeignKey({
            name:"FKCarSpecifications",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
          })
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey(
        "specification_cars","FKCarSpecifications"
      )
      await queryRunner.dropForeignKey(
        "specification_cars","FKSpecificationsCar"
      )
      await queryRunner.dropTable("specification_cars")
    }

}
