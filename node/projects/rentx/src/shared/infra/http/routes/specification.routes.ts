import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/usecases/create_specification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/usecases/list_specifications/ListSpecificationsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.use(ensureAuthenticated);

specificationRoutes.get("/", async (req, res) =>
    await listSpecificationsController.handle(req, res) 
);


specificationRoutes.post("/", (req, res) => 
    createSpecificationController.handle(req, res)
);

export { specificationRoutes };


