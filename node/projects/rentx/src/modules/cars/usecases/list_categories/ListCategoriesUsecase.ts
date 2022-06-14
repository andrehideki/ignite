import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUsecase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository) {}

    async execute(): Promise<Category[]> {
        return await this.categoriesRepository.list();
    }
}

export { ListCategoriesUsecase };