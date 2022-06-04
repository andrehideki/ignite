import { ISpecificationRespository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUsecase {
    
    constructor(private specificationRepository: ISpecificationRespository) {}

    execute({ name, description }: IRequest) {
        const specificationAlreadyExists = !!this.specificationRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new Error("Specification already exists ");
        }
        this.specificationRepository.create({
            name,
            description
        });
    }
}

export { CreateSpecificationUsecase };