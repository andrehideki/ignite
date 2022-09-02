import { Category } from "@shared/infra/typeorm/entities/Category";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUsecase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository) {}

    async execute({ brand, category_id, name }: IRequest): Promise<Category[]> {
        return await this.carsRepository.findAvailable(brand, category_id, name);
    }
}

export { ListAvailableCarsUsecase };