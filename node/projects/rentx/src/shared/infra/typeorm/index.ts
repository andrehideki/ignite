import { DataSource, DataSourceOptions } from "typeorm";

const datasourceProperties: DataSourceOptions = {
    type: "postgres",
    host: process.env.DATABASE_URL || "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: process.env.NODE_ENV == "test"
        ? "rentx_test" 
        : "rentx" ,
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    entities: ["./src/shared/infra/typeorm/entities/*{.js,.ts}"]
};

async function createDataSource() {
    const appDataSource = new DataSource(datasourceProperties);
    try {
        await appDataSource.initialize();
        console.log("Data Source has been initialized!");
        return appDataSource;
    } catch(err) {
        throw new Error("Error during Data Source initialization", err);
    }
}

export const AppDataSource = new DataSource(datasourceProperties);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

// const AppDataSource = await createDataSource();
export { createDataSource };

