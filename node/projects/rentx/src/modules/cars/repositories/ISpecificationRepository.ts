import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRespository {
    create({ name, description }: ICreateSpecificationDTO): void;
    list(): Specification[];
    findByName(name: string): Specification;
}

export { ISpecificationRespository, ICreateSpecificationDTO };