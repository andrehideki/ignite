import { app } from "@shared/infra/http/app";
import "dotenv/config";
import request from "supertest";

jest.useFakeTimers();

describe("Create Category Controller", () => {
    it("should be able to create a new category", async () => {
        const response = await request(app).get("/categories").send({
            name: "category supertest",
            description: "description"
        });
        expect(response.status).toBe(201);
    });
});