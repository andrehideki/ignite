import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUsecase } from "./ImportCategoryUsecase";

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUsecase = new ImportCategoryUsecase(categoriesRepository);
const importCategoryController = new ImportCategoryController(createCategoryUsecase);

export { importCategoryController };