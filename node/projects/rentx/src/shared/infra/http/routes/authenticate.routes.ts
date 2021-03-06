import { AuthenticateUserController } from "@modules/accounts/usecases/AthenticateUser/AuthenticateUserController";
import { Router } from "express";


const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };