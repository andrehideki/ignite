import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/usecases/create_specification/CreateSpecificationController";

import { listSpecificationsController } from "../modules/cars/usecases/list_specifications";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationRoutes.get("/", (req, res) =>{
    return listSpecificationsController.handle(req, res)   ;
});


specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };


