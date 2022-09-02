import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCarsSetCategoryColumnAsNullable1655564525150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("cars", "category_id", new TableColumn({
            name: "category_id",
            type: "uuid",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("cars", "category_id", new TableColumn({
            name: "category_id",
            type: "uuid"
        }));
    }
}
