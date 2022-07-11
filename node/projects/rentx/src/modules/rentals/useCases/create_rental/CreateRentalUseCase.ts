import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(
        @inject("")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({ car_id, user_id, expected_return_date}: IRequest) {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id); 
        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }
        // O aluguel de ter duração minima de 24 horas.
        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date
        });
        return rental;
    }
}

export { CreateRentalUseCase };

