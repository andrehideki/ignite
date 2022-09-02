import { CarImage } from "@shared/infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };