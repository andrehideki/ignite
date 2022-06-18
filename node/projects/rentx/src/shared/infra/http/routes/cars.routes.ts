import { CreateCarController } from "@modules/cars/usecases/create_car/CreateCarController";
import { Router } from "express";

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };