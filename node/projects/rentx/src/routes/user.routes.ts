import { Router } from "express";
import { CreateUserController } from "../modules/accounts/usecases/CreateUser/CreateUserController";

const userRoutes = Router();
const createUserController = new CreateUserController();


userRoutes.post("/", (req, res) => 
    createUserController.handle(req, res)
);

export { userRoutes };
