import "reflect-metadata"
import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "m4r1n42017",
    database: "rentx",
    migrations: ["src/database/migrations/*.ts"],
    entities: ["src/**/**/entities/*.ts"],
    logging: false,
    synchronize: false,
    migrationsTableName: 'custom_migration_table',
})
