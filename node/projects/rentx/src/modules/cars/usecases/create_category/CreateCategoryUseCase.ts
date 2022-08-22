import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";


interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRespository
    ) {}

    async execute({ name, description }: IRequest) {
        const categoryAlreadyExists = !!await this.categoryRepository.findByName(name);
        console.log("categoryAlreadyExists", name, categoryAlreadyExists)
        if (categoryAlreadyExists) {
            throw new AppError("Category already exists");
        }
        await this.categoryRepository.create({
            name,
            description
        });
    }
}

export { CreateCategoryUseCase };