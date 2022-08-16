import { DataSource, DataSourceOptions } from "typeorm";

const datasourceProperties: DataSourceOptions = {
    type: "postgres",
    host: process.env.DATABASE_URL || "localhost",
    port: process.env.NODE_ENV == "test"
        ? 5433
        : 5432,
    username: "docker",
    password: "ignite",
    database: process.env.NODE_ENV == "test"
        ? "rentx_test" 
        : "rentx" ,
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    entities: ["./src/shared/infra/typeorm/entities/*{.js,.ts}"]
};

export async function createDataSource(): Promise<DataSource> {
    const appDataSource = new DataSource(datasourceProperties);
    try {
        //await appDataSource.runMigrations();
        await appDataSource.initialize();
        console.log("Data Source has been initialized!");
        return appDataSource;
    } catch(err) {
        throw new Error("Error during Data Source initialization", err);
    }
}

export async function runMigrations() {
    const datasource = await createDataSource();
    try {
        console.log("Running migrations")
        await datasource.runMigrations();
        console.log("Migrations finished")
    } catch (e) {
        console.error(e)
    }
}

export async function dropDatabase() {
    const datasource = await createDataSource();
    try {
        console.log("Deleting database")
        await datasource.dropDatabase();
        console.log("Database deleted")
    } catch (e) {
        console.error(e)
    }
}


export const appDataSource = new DataSource(datasourceProperties);
