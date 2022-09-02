import { appDataSource } from "@shared/infra/typeorm";
import { injectable, singleton } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Category } from "../../../../../shared/infra/typeorm/entities/Category";
import { ICategoriesRespository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";


@injectable()
@singleton()
class CategoriesRepository implements ICategoriesRespository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = appDataSource.getRepository(Category);
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
