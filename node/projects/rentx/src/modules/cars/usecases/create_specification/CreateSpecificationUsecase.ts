import { inject, injectable } from "tsyringe";

import { ISpecificationsRespository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUsecase {
    
        constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRespository
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
