import { inject, injectable } from "tsyringe";
import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

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
        if (categoryAlreadyExists) {
            throw new Error("Category already exists ");
        }
        await this.categoryRepository.create({
            name,
            description
        });
    }
}

export { CreateCategoryUseCase };