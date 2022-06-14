import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: ICategoriesRespository;
describe("Create Category UseCase", () => {

    beforeEach(() => {
        categoriesRepository = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category name",
            description: "Category description"
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });
        const categoryCreated = await categoriesRepository.findByName(category.name);
        expect(categoryCreated).toHaveProperty("id");
    });
});
