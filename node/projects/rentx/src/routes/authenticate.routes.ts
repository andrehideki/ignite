import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/usecases/AthenticateUser/AuthenticateUserController";
import asyncHandler from "express-async-handler";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", asyncHandler(async (request, reponse) => await authenticateUserController.handle(request, reponse)));

export { authenticateRoutes };