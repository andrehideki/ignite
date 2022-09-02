import { Specification } from "@shared/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRespository } from "../ISpecificationRepository";

export class SpecificationsRepositoryInMemory implements ISpecificationsRespository {
    
    specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            name, description
        });
        this.specifications.push(specification);
        return specification;
    }

    async list(): Promise<Specification[]> {
        return this.specifications;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(spe => spe.name == name);
    }
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = [];
        for (const id of ids) {
            const specification = this.specifications.find(spe => spe.id == id);           
            if (specification) specifications.push(specification);
        }
        return specifications;
    }
    
}