import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import "reflect-metadata";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "123",
            user_id: "432",
            expected_return_date: new Date()
        });
        expect(rental).toHaveProperty("id");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "321",
                user_id: "xxx",
                expected_return_date: new Date()
            });
            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "xxx",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "xxx",
                user_id: "1",
                expected_return_date: new Date()
            });
            await createRentalUseCase.execute({
                car_id: "yyyy",
                user_id: "1",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
