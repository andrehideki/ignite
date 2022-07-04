import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUsecase } from "./ListAvailableCarsUsecase";

class ListAvailableCarsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, category_id, brand } = request.query;
        const listAvailableCarsUsecase = container.resolve(ListAvailableCarsUsecase);
        const categories = await listAvailableCarsUsecase.execute({ 
            name: name as string, 
            category_id: category_id as string, 
            brand: brand as string 
        });
        return response.json(categories);
    }
}

export { ListAvailableCarsController };