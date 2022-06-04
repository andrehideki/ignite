import { Router } from "express";
import { createSpecificationController } from "../modules/cars/usecases/create_specification";
import { listSpecificationsController } from "../modules/cars/usecases/list_specifications";

const specificationRoutes = Router();

specificationRoutes.get("/", (req, res) =>{
    return listSpecificationsController.handle(req, res)   ;
});

specificationRoutes.post("/", (req, res) => {
    return createSpecificationController.handle(req, res);
});

export { specificationRoutes };


