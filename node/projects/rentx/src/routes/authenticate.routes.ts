import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/usecases/AthenticateUser/AuthenticateUserController";


const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", (request, reponse) => 
    authenticateUserController.handle(request, reponse));

export { authenticateRoutes };