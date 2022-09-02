import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/usecases/create_specification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/usecases/list_specifications/ListSpecificationsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.use(ensureAuthenticated);

specificationRoutes.get("/",  listSpecificationsController.handle);


specificationRoutes.post("/", ensureAdmin, createSpecificationController.handle);

export { specificationRoutes };


