import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppDataSource } from "@shared/infra/typeorm";
import { Car } from "@shared/infra/typeorm/entities/Car";

import { Repository } from "typeorm";

class CarsRepository implements ICarsRepository {
    
    private repository: Repository<Car>;

    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }
   

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, available }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, description, daily_rate, license_plate, fine_amount, brand, category_id, available
        });
        this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.repository.findOneBy({
            license_plate
        });
    }
    
    async findById(id: string): Promise<Car> {
        return await this.repository.findOneBy({
            id
        });
    }

    async findAvailable( 
        brand?: string, 
        category_id?: string,
        name?:string
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });
        if (brand) carsQuery.where("c.brand = :brand", { brand });
        if (category_id) carsQuery.where("c.category_id = :category_id", { category_id });
        if (name) carsQuery.where("c.name = :name", { name });
        return await carsQuery.getMany();
    }
    
}

export { CarsRepository };