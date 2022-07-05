import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { Car } from "@shared/infra/typeorm/entities/Car";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { v4 as uuidV4 } from "uuid";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRespository } from "@modules/cars/repositories/ISpecificationRepository";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { Specification } from "@shared/infra/typeorm/entities/Specification";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: ICarsRepository;
let specificationsRepository: ISpecificationsRespository;
let car1: Car;
let specification: Specification;

function generateCar(available) {
        
    return {
        "name": uuidV4(), 
        "description": uuidV4(), 
        "daily_rate": 10, 
        "license_plate": uuidV4(), 
        "fine_amount": 1000,
        "brand": uuidV4(), 
        "category_id": uuidV4(),
        "available": available
    };
}

describe("Create car specification", () => {
    
    
    beforeEach(async () => { 
        carsRepository = new CarsRepositoryInMemory();
        specificationsRepository = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationsRepository);
        car1 = await carsRepository.create(generateCar(true));
        specification = await specificationsRepository.create({
            name: uuidV4(),
            description: uuidV4()
        });
    });

    it("Should be able to add a new specification", async () => {
        await createCarSpecificationUseCase.execute({
            car_id: car1.id,
            specifications_ids: [specification.id]
        });
        expect(car1.specifications).toHaveLength(1);
    });

    it("Should not be able to add a new specification to a non existing car", async () => {
        try {
            await createCarSpecificationUseCase.execute({
                car_id: "not_existing_id",
                specifications_ids: ["432"]
            });
        } catch(e) {
            expect(e).toBeInstanceOf(AppError);
        }
    });

    it("Should not be able to add a new specification to a non existing car", async () => {
        try {
            await createCarSpecificationUseCase.execute({
                car_id: "not_existing_id",
                specifications_ids: ["432"]
            });
        } catch(e) {
            expect(e).toBeInstanceOf(AppError);
        }
    });
});