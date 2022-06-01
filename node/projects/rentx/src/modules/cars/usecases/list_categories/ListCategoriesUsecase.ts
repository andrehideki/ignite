import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

class ListCategoriesUsecase {

    constructor(private categoriesRepository: CategoriesRepository) {}

    execute() {
        return this.categoriesRepository.list();
    }
}

export { ListCategoriesUsecase };