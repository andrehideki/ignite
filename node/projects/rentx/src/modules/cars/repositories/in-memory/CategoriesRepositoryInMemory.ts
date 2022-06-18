import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRespository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRespository {
    categories: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();
        Object.assign(category, {
            name, description
        });
        this.categories.push(category);
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }

    async findByName(name: string): Promise<Category> {
        return this.categories.find(cat => cat.name === name);
    }

}

export { CategoriesRepositoryInMemory };