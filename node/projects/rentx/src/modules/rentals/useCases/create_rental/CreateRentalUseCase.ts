import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject } from "tsyringe";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {

    MINIMUM_RENTAL_PERIOD_IN_HOURS = 24;

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
        const expectedReturnDateFormat = dayjs(expected_return_date)
            .utc()
            .local()
            .format();
        const today = dayjs()
            .utc()
            .local()
            .format();
        const difference = dayjs(expectedReturnDateFormat).diff(today, "hours");
        if (difference < this.MINIMUM_RENTAL_PERIOD_IN_HOURS) {
            throw new AppError("Invalid return date");
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

