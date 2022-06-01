import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUsecase } from "./CreateCategoryUsercase";

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUsecase = new CreateCategoryUsecase(categoriesRepository);
const createCategoryController = new CreateCategoryController(createCategoryUsecase);

export { createCategoryController };