import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: ICategoriesRespository;
describe("Create Category", () => {

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

    it("Should not be able to create a new category with existing name", async () => {
        const category = {
            name: "Category name",
            description: "Category description"
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });
        try {
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        } catch(error) {
            expect(error.message).toBe("Category already exists");
        }
    });
});
