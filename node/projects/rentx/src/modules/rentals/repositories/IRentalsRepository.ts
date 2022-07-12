import { Rental } from "../infra/typeorm/entities/Rental";

interface ICreateData {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

interface IRentalsRepository {
    create(dto: ICreateData): Promise<Rental>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository, ICreateData };

