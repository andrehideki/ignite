import { CreateCarController } from "@modules/cars/usecases/create_car/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/usecases/create_car_specification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/usecases/list_available_cars/ListAvailableCarsController";
import { Router } from "express";
import "express-async-errors";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

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

carsRoutes.get(
    "/available",
    listAvailableCarsController.handle
);

export { carsRoutes };