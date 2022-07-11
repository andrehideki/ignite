import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateData, IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    
    rentals: Rental[] = [];

    async findOpenRentalByCar(car_id: String): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    }

    async findOpenRentalByUser(user_id: String): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    }

    async create(dto: ICreateData): Promise<Rental> {
        const rental = new Rental();
        Object.assign(rental, {
            ...dto,
            start_date: new Date()
        });
        this.rentals.push(rental);
        return rental;
    }
    
}

export { RentalsRepositoryInMemory };

