import { app } from "@shared/infra/http/app";
import "@shared/infra/typeorm";
import { createDataSource, dropDatabase, runMigrations } from "@shared/infra/typeorm";
import { Category } from "@shared/infra/typeorm/entities/Category";
import "dotenv/config";
import request from "supertest";
import { DataSource } from "typeorm";

// jest.useFakeTimers();
jest.setTimeout(10000)
let datasource: DataSource;

describe("List categories Controller", () => {

    beforeEach(async () => {
        datasource = await createDataSource();
        await datasource.runMigrations();
    });

    afterEach(async () => {
        await dropDatabase();        
    });

    it("should be able to list all categories", async () => {
        await request(app)
            .post("/categories")
            .send({
                name: "category supertest",
                description: "description"
            });
        const response = await request(app).get("/categories").send();
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toHaveProperty("category supertest");
    });
   
});