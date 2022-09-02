import { CreateCategoryController } from "@modules/cars/usecases/create_category/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/usecases/import_category/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/usecases/list_categories/ListCategoriesController";
import { Router } from "express";

import multer from "multer";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

const upload = multer({
    dest: "./tmp"
});

categoriesRoutes.get("/", (req, res) => 
    listCategoriesController.handle(req, res)
);


categoriesRoutes.post("/", (req, res) => 
    createCategoryController.handle(req, res)
);

categoriesRoutes.post("/import", upload.single("file"), (req, res) => 
    importCategoryController.handle(req, res)
);

export { categoriesRoutes };
