import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUsecase } from "./CreateCategoryUsercase";

export default (): CreateCategoryController => {
    const categoriesRepository = CategoriesRepository.getInstance();
    const createCategoryUsecase = new CreateCategoryUsecase(categoriesRepository);
    const createCategoryController = new CreateCategoryController(createCategoryUsecase);
    return createCategoryController;
};
