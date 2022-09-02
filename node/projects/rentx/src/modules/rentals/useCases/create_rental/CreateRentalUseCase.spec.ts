import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/date_provider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import "reflect-metadata";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let dayAdd24hours = dayjs(dayjs()).add(1, "day").toDate();
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, new DayjsDateProvider());
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "123",
            user_id: "432",
            expected_return_date: dayAdd24hours
        });
        expect(rental).toHaveProperty("id");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "321",
                user_id: "xxx",
                expected_return_date: dayAdd24hours
            });
            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "xxx",
                expected_return_date: dayAdd24hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "xxx",
                user_id: "1",
                expected_return_date: dayAdd24hours
            });
            await createRentalUseCase.execute({
                car_id: "yyyy",
                user_id: "1",
                expected_return_date: dayAdd24hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if expect return date is invalid", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "xxx",
                user_id: "1",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
