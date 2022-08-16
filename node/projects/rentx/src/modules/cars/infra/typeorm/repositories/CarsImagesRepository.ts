import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarImage } from "@shared/infra/typeorm/entities/CarImage";
import { DataSource, Repository } from "typeorm";

class CarsImagesRepository implements ICarsImagesRepository {
    
    private repository: Repository<CarImage>;

    constructor(appDataSource: DataSource) {
        this.repository = appDataSource.getRepository(CarImage);
    }
    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name
        });
        this.repository.save(carImage);
        return carImage;
    }
}

export { CarsImagesRepository };