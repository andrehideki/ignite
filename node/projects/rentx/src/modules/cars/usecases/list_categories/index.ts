import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUsecase } from "./ListCategoriesUsecase";

const categoriesRepository = new CategoriesRepository();
const listCategoriesUsecase = new ListCategoriesUsecase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUsecase);

export { listCategoriesController };