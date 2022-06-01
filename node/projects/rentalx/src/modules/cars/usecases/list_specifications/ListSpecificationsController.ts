import { Request, Response } from "express";
import { ListSpecificationsUsecase } from "./ListSpecificationsUsecase";

class ListSpecificationsController {

    constructor(private listSpecificationsUsecase: ListSpecificationsUsecase) {}

    handle(request: Request, response: Response) {
        return response.json(this.listSpecificationsUsecase.execute());
    }
}

export { ListSpecificationsController };