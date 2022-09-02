import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { IUpdateCarDTO } from "@modules/cars/dto/IUpdateCarDTO";
import { Car } from "@shared/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    
    
  
    
    cars: Car[] = [];

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, available }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name, description, daily_rate, license_plate, fine_amount, brand, category_id, available
        });
        this.cars.push(car);
        return car;
    }

    async update({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, available, id, specifications }: IUpdateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            id, name, description, daily_rate, license_plate, fine_amount, brand, category_id, available, specifications
        });
        this.cars.push(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate == license_plate);
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find(car => car.id == id);
    }

    async findAvailable(
        brand?: string, 
        category_id?: string,
        name?:string): Promise<Car[]> {
        return this.cars.filter(car => 
                car.available &&
                (!category_id || category_id == car.category_id) &&
                (!brand || brand == car.brand) &&
                (!name || name == car.name)
        );
    }

    async findAvailableById(id: string): Promise<Car> {
        return this.cars.find(car => car.id == id && car.available);
    }
}

export { CarsRepositoryInMemory };

