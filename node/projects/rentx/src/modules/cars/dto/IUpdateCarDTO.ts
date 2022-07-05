import { Specification } from "@shared/infra/typeorm/entities/Specification";

interface IUpdateCarDTO {
    id: string;
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    available: boolean;
    specifications?: Specification[];
}

export { IUpdateCarDTO };