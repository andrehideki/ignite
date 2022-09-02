import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationsUsecase } from "./ListSpecificationsUsecase";

class ListSpecificationsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listSpecificationsUsecase = container.resolve(ListSpecificationsUsecase);
        const specifications = await listSpecificationsUsecase.execute();
        return response.json(specifications);
    }
}

export { ListSpecificationsController };