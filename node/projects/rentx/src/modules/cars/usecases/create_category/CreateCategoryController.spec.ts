import { app } from "@shared/infra/http/app";
import "@shared/infra/typeorm";
import { createDataSource, dropDatabase, runMigrations } from "@shared/infra/typeorm";
import { Category } from "@shared/infra/typeorm/entities/Category";
import "dotenv/config";
import request from "supertest";
import { DataSource } from "typeorm";

let datasource: DataSource;

describe("Create Category Controller", () => {

    beforeAll(async () => {
        datasource = await createDataSource();
    });

    beforeEach(async () => {
        await datasource.runMigrations();
    });

    afterEach(async () => {
        await dropDatabase();        
    });

    it("should be able to create a new category", async () => {
        const response = await request(app)
            .post("/categories")
            .send({
                name: "category supertest",
                description: "description"
            });
        expect(response.status).toBe(201);
    });
   
    it("should not be able to create a new category if name exists", async () => {
        await request(app)
            .post("/categories")
            .send({
                name: "category supertest",
                description: "description"
            });
        const response = await request(app)
            .post("/categories")
            .send({
                name: "category supertest",
                description: "description"
            });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Category already exists");
    });
   
});