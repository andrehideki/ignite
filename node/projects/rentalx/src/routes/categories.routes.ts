import { Router } from "express";
import { createCategoryController } from "../modules/cars/usecases/create_category";
import { listCategoriesController } from "../modules/cars/usecases/list_categories";

import multer from "multer";
import { importCategoryController } from "../modules/cars/usecases/import_category";

const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp"
});

categoriesRoutes.get("/", (req, res) =>{
    return listCategoriesController.handle(req,res);
});

categoriesRoutes.post("/", (req, res) => {
    return createCategoryController.handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), async (req, res) => {
    return await importCategoryController.handle(req, res);
});

export { categoriesRoutes };
