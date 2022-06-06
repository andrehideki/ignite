import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRespository } from "../ISpecificationRepository";


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
