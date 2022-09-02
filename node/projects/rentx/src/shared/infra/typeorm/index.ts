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


export const appDataSource = new DataSource(datasourceProperties);

export async function createDataSource(): Promise<DataSource> {
    try {
        await appDataSource.initialize();
        console.log("Data Source has been initialized!");
        return appDataSource;
    } catch(err) {
        throw new Error("Error during Data Source initialization", err);
    }
}

export async function runMigrations() {
    try {
        console.log("Running migrations")
        await appDataSource.runMigrations();
        console.log("Migrations finished")
    } catch (e) {
        console.error(e)
    }
}

export async function dropDatabase() {
    try {
        console.log("Deleting database")
        if (appDataSource.isInitialized)  {
            await appDataSource.dropDatabase();
        }
        console.log("Database deleted")
    } catch (e) {
        console.error(e)
    }
}


