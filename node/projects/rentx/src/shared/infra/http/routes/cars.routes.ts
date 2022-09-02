import { CreateCarController } from "@modules/cars/usecases/create_car/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/usecases/create_car_specification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/usecases/list_available_cars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/usecases/upload_car_image/UploadCarImagesController";
import { Router } from "express";
import uploadConfig from "@config/upload";
import "express-async-errors";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const uploadCarImages = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
carsRoutes.use(ensureAuthenticated);

carsRoutes.post(
    "/", 
    ensureAdmin, 
    createCarController.handle
);

carsRoutes.post(
    "/specification/:id", 
    ensureAdmin, 
    createCarSpecificationController.handle
);

carsRoutes.post(
    "/images/:id", 
    ensureAdmin, 
    uploadCarImages.array("images"),
    uploadCarImagesController.handle
);

carsRoutes.get(
    "/available",
    listAvailableCarsController.handle
);

export { carsRoutes };