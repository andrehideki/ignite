import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRespository {
    create({ name, description }: ICreateCategoryDTO): void;
    list(): Category[];
    findByName(name: string): Category;
}

export { ICategoriesRespository, ICreateCategoryDTO };