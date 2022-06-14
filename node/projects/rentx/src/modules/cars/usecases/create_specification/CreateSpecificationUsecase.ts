import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ISpecificationRespository } from "@modules/cars/repositories/ISpecificationRepository";


interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUsecase {
    
        constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRespository
    ) {}

    async execute({ name, description }: IRequest): Promise<void>{
        const specificationAlreadyExists = !!await this.specificationRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new AppError("Specification already exists ");
        }
        await this.specificationRepository.create({
            name,
            description
        });
    }
}

export { CreateSpecificationUsecase };