import { Router } from "express";
import asyncHandler from "express-async-handler";

import multer from "multer";
import { importCategoryController } from "../modules/cars/usecases/import_category";
import { CreateCategoryController } from "../modules/cars/usecases/create_category/CreateCategoryController";
import { ListCategoriesController } from "../modules/cars/usecases/list_categories/ListCategoriesController";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
    dest: "./tmp"
});

categoriesRoutes.get("/", asyncHandler(async(req, res) => 
    await listCategoriesController.handle(req, res)
));


categoriesRoutes.post("/", asyncHandler(async (req, res) => 
    await createCategoryController.handle(req, res)
));

categoriesRoutes.post("/import", upload.single("file"), async (req, res) => {
    return await importCategoryController.handle(req, res);
});

export { categoriesRoutes };
