import {  DataSource } from "typeorm";


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