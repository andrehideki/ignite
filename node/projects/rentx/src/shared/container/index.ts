import { container } from "tsyringe";
import { ICategoriesRespository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRespository } from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRespository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRespository>(
    "SpecificationRepository",
    SpecificationRepository
);
