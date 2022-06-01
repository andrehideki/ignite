import { Specification } from "../../../cars/model/Specification";
import { ICreateSpecificationDTO, ISpecificationRespository } from "../ISpecificationRepository";


class SpecificationRepository implements ISpecificationRespository {

    private static INSTANCE: SpecificationRepository;
    private specifications: Specification[];

    private constructor() {
        this.specifications = [];
    }

    public static getInstance() {
        if (!SpecificationRepository.INSTANCE) {
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        return SpecificationRepository.INSTANCE;
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });
        this.specifications.push(specification);
    }

    list(): Specification[] {
        return this.specifications;
    }

    findByName(name: string): Specification {
        return this.specifications.find(c => c.name == name);
    }
}

export { SpecificationRepository };
