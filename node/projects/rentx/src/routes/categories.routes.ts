import { Router } from "express";
import { listCategoriesController } from "../modules/cars/usecases/list_categories";

import asyncHandler from "express-async-handler";

import multer from "multer";
import { importCategoryController } from "../modules/cars/usecases/import_category";
import { CreateCategoryController } from "../modules/cars/usecases/create_category/CreateCategoryController";

const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp"
});

categoriesRoutes.get("/", (req, res) =>{
    return listCategoriesController.handle(req,res);
});

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", asyncHandler(async (req, res) => {
    return await createCategoryController.handle(req, res);
}));

categoriesRoutes.post("/import", upload.single("file"), async (req, res) => {
    return await importCategoryController.handle(req, res);
});

export { categoriesRoutes };
