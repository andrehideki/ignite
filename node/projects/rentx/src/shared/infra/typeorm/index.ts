import {  DataSource } from "typeorm";

async function createDataSource() {
    const appDataSource = new DataSource({
        type: "postgres",
        host: process.env.DATABASE_URL || "localhost",
        port: 5432,
        username: "docker",
        password: "ignite",
        database: "rentx",
        migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
        entities: ["./src/shared/infra/typeorm/entities/*{.js,.ts}"]
    });
    try {
        await appDataSource.initialize();
        console.log("Data Source has been initialized!");
        return appDataSource;
    } catch(err) {
        throw new Error("Error during Data Source initialization", err);
    }
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_URL || "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    entities: ["./src/shared/infra/typeorm/entities/*{.js,.ts}"]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

// const AppDataSource = await createDataSource();
export { createDataSource };