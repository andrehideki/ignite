import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {

    async handle(request: Request, response: Response) {
        const {  name, driver_license, email, password } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        const user = await createUserUseCase.execute({ name, driver_license, email, password });
        return response.status(201).json(user);
    }
}

export { CreateUserController };