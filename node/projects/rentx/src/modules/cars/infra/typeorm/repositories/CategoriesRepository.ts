import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { Category } from "../../../../../shared/infra/typeorm/entities/Category";
import { ICategoriesRespository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";



class CategoriesRepository implements ICategoriesRespository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name
        });
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOneBy({
            name
        });
        return category;
    }
}

export { CategoriesRepository };
