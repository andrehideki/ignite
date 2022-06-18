import { Car } from "@shared/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../dto/ICreateCarDTO";

interface ICarsRepository {
    create(dto: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findById(id: string): Promise<Car>;
}

export { ICarsRepository };