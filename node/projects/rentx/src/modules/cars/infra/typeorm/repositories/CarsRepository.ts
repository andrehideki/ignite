import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { IUpdateCarDTO } from "@modules/cars/dto/IUpdateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { appDataSource } from "@shared/infra/typeorm";
import { Car } from "@shared/infra/typeorm/entities/Car";

import { DataSource, Repository } from "typeorm";

class CarsRepository implements ICarsRepository {
    
    private repository: Repository<Car>;

    constructor() {
        this.repository = appDataSource.getRepository(Car);
    }

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, available }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, description, daily_rate, license_plate, fine_amount, brand, category_id, available
        });
        this.repository.save(car);
        return car;
    }

    async update({ id, name, description, daily_rate, license_plate, fine_amount, brand, category_id, available, specifications }: IUpdateCarDTO): Promise<Car> {
        const car = await this.repository.findOneBy({
            id
        });
        Object.assign(car, {
            name, description, daily_rate, license_plate, fine_amount, brand, category_id, available, specifications
        });
        this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const cars = await this.repository.findOneBy({
            license_plate
        });
        return cars;
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
            .leftJoinAndSelect("c.specifications", "specification")
            .where("available = :available", { available: true });
        if (brand) carsQuery.where("c.brand = :brand", { brand });
        if (category_id) carsQuery.where("c.category_id = :category_id", { category_id });
        if (name) carsQuery.where("c.name = :name", { name });
        const cars = await carsQuery.getMany();
        for (const car of cars) {
            console.log(await car.specifications);
        }
        return cars;
    }
    
}

export { CarsRepository };
