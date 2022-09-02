import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRespository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_ids: string[];
}

@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository, 
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRespository) {}

    async execute({ car_id, specifications_ids }: IRequest) {
        const car = await this.carsRepository.findById(car_id);
        const carNotExists = !car;
        if (carNotExists) {
            throw new AppError("Car not exists");
        }
        const specifications = await this.specificationsRepository.findByIds(specifications_ids);
        const specificationsNotExists = !specifications;
        if (specificationsNotExists) {
            throw new AppError("Any specification was founded");
        }
        car.specifications = specifications;
        this.carsRepository.update({
            id: car.id,
            brand: car.brand,
            category_id: car.category_id,
            daily_rate: car.daily_rate,
            description: car.description,
            fine_amount: car.fine_amount,
            license_plate: car.license_plate,
            name: car.name,
            specifications,
            available: car.available
        });
    }
}

export { CreateCarSpecificationUseCase };