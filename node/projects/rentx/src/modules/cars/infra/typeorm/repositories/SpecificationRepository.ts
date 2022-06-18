import { ICreateSpecificationDTO, ISpecificationRespository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppDataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { Specification } from "../../../../../shared/infra/typeorm/entities/Specification";


class SpecificationRepository implements ISpecificationRespository {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description
        });
        await this.repository.save(specification);
    }

    async list(): Promise<Specification[]> {
        return await this.repository.find();
    }

    async findByName(name: string): Promise<Specification> {
        return await this.repository.findOneBy({
            name
        });
    }
}

export { SpecificationRepository };
