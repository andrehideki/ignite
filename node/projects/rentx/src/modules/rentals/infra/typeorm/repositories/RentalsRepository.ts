import { ICreateData, IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { DataSource, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    
    private repository: Repository<Rental>;

    constructor(appDataSource: DataSource) {
        this.repository = appDataSource.getRepository(Rental);
    }

    async create({ car_id, expected_return_date, user_id }: ICreateData): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id
        });
        await this.repository.save(rental);
        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOneBy({
            car_id: car_id
        });
    }
    
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOneBy({
            user_id
        });
    }
    
}

export { RentalsRepository };

