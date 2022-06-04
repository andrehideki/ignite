import { Request, Response } from "express";
import { CreateCategoryUsecase } from "./CreateCategoryUsercase";

class CreateCategoryController {

    constructor(private createCategoryUsecase: CreateCategoryUsecase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        await this.createCategoryUsecase.execute({ name, description });
        return response.status(201).send();
    }
}

export { CreateCategoryController };