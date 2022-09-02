import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/usecases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/usecases/UpdateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);
userRoutes.use(ensureAuthenticated);
userRoutes.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle);



export { userRoutes };
