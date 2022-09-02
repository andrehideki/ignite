import { inject, injectable } from "tsyringe";

import { Specification } from "@shared/infra/typeorm/entities/Specification";
import { ISpecificationsRespository } from "@modules/cars/repositories/ISpecificationRepository";


@injectable()
class ListSpecificationsUsecase {

    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRespository) {}

    async execute(): Promise<Specification[]> {
        return await this.specificationsRepository.list();
    }
}

export { ListSpecificationsUsecase };