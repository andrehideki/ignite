import { ICreateSpecificationDTO, ISpecificationsRespository } from "@modules/cars/repositories/ISpecificationRepository";
import { appDataSource } from "@shared/infra/typeorm";
import { singleton } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Specification } from "../../../../../shared/infra/typeorm/entities/Specification";

@singleton()
class SpecificationsRepository implements ISpecificationsRespository {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = appDataSource.getRepository(Specification);
    }
   

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description
        });
        await this.repository.save(specification);
        return specification;
    }

    async list(): Promise<Specification[]> {
        return await this.repository.find();
    }

    async findByName(name: string): Promise<Specification> {
        return await this.repository.findOneBy({
            name
        });
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = [];
        for (const id of ids) {
            const specification = await this.repository.findOneBy({ id });[];
            if (specification) specifications.push(specification);
        }
        return specifications;
    }
}

export { SpecificationsRepository };
