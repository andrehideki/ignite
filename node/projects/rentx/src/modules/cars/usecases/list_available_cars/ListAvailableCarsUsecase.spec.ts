import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUsecase } from "./ListAvailableCarsUsecase";
import { v4 as uuidV4 } from "uuid";
describe("List cars", () => {
    

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

    let listCarsUseCase: ListAvailableCarsUsecase;
    let carsRepository: ICarsRepository;
    let availableCar1, availableCar2;
    let inavailableCar;

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUsecase(carsRepository);
        availableCar1 = generateCar(true);
        availableCar2 = generateCar(true);
        inavailableCar = generateCar(false);
        [ inavailableCar, availableCar1, availableCar2 ]
            .forEach(car => carsRepository.create(car));
    });

    it("should be able to list all available cars", async () => {
        const cars = await listCarsUseCase.execute({});
        expect(cars.length).toBe(2);
    });

    it("should be able to list all available cars by name", async () => {
        const cars = await listCarsUseCase.execute({ name: availableCar1.name });
        expect(cars).toMatchObject([
            availableCar1
        ]);
    });

    it("should be able to list all available cars by category id", async () => {
        const cars = await listCarsUseCase.execute({ category_id: availableCar2.category_id });
        expect(cars).toMatchObject([
            availableCar2
        ]);
    });
});