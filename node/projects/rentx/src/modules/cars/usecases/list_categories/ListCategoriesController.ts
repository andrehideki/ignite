import { Request, Response } from "express";
import { ListCategoriesUsecase } from "./ListCategoriesUsecase";

class ListCategoriesController {

    constructor(private listCategoriesUsecase: ListCategoriesUsecase) {}

    handle(request: Request, response: Response) {
        return response.json(this.listCategoriesUsecase.execute());
    }
}

export { ListCategoriesController };