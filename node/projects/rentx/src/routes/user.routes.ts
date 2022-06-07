import { Router } from "express";
import asyncHandler from "express-async-handler";
import { CreateUserController } from "../modules/accounts/usecases/CreateUser/CreateUserController";

const userRoutes = Router();
const createUserController = new CreateUserController();


userRoutes.post("/", asyncHandler(async (req, res) => 
    await createUserController.handle(req, res)
));

export { userRoutes };
