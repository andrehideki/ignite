import { app } from "@shared/infra/http/app";
import "@shared/infra/typeorm";
import { createDataSource } from "@shared/infra/typeorm";
import { Category } from "@shared/infra/typeorm/entities/Category";
import "dotenv/config";
import request from "supertest";

// jest.useFakeTimers();

describe("Create Category Controller", () => {

    beforeEach(async () => {
        const datasource = await createDataSource();    
        await datasource.getRepository(Category).query("DELETE FROM categories")
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
});