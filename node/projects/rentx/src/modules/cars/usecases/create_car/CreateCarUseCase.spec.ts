import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import "reflect-metadata";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: ICarsRepository;
describe("Create Car", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "car",
            description: "test car",
            brand: "brand",
            category_id: "",
            license_plate: "1234",
            daily_rate: 3,
            fine_amount: 300
        });
        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a new car with a existing license plate", async () => {
        expect(async () => {
            const car = {
                name: "car",
                description: "test car",
                brand: "brand",
                category_id: "",
                license_plate: "1234",
                daily_rate: 3,
                fine_amount: 300
            };
            await createCarUseCase.execute(car);
            await createCarUseCase.execute(car);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new car with a available true by default", async () => {
        const car = {
            name: "car",
            description: "test car",
            brand: "brand",
            category_id: "",
            license_plate: "1234",
            daily_rate: 3,
            fine_amount: 300
        };
        const { id: savedId } = await createCarUseCase.execute(car);
        const savedCar = await carsRepository.findById(savedId);
        expect(savedCar.available).toBeTruthy();
    });
});