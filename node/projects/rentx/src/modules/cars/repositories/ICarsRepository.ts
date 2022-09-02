import { Car } from "@shared/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../dto/ICreateCarDTO";
import { IUpdateCarDTO } from "../dto/IUpdateCarDTO";

interface ICarsRepository {
    create(dto: ICreateCarDTO): Promise<Car>;
    update(dto: IUpdateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findById(id: string): Promise<Car>;
    findAvailable(
        brand?: string, 
        category_id?: string,
        name?:string
    ): Promise<Car[]>;
}

export { ICarsRepository };

