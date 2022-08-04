import { app } from "@shared/infra/http/app";
import "@shared/infra/typeorm";
import { createDataSource } from "@shared/infra/typeorm";
import "dotenv/config";
import request from "supertest";

// jest.useFakeTimers();

describe("Create Category Controller", () => {

    beforeAll(async () => {
        await createDataSource();
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