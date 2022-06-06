import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/usecases/create_specification/CreateSpecificationController";

import asyncHandler from "express-async-handler";
import { ListSpecificationsController } from "../modules/cars/usecases/list_specifications/ListSpecificationsController";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.get("/", asyncHandler(async (req, res) => 
    await listSpecificationsController.handle(req, res) 
));


specificationRoutes.post("/", asyncHandler(async (req, res) => 
    await createSpecificationController.handle(req, res)
));

export { specificationRoutes };


