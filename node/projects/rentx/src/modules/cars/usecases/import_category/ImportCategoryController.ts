import { Request, Response } from "express";
import { ImportCategoryUsecase } from "./ImportCategoryUsecase";

class ImportCategoryController {

    constructor(private importCategoryUsecase: ImportCategoryUsecase) {}

    handle(request: Request, response: Response): Response {
        const { file } = request;
        this.importCategoryUsecase.execute(file);
        return response.status(201).send();
    }
}

export { ImportCategoryController }; 