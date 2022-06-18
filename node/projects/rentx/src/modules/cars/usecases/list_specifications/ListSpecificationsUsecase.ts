import { inject, injectable } from "tsyringe";

import { Specification } from "@shared/infra/typeorm/entities/Specification";
import { ISpecificationRespository } from "@modules/cars/repositories/ISpecificationRepository";


@injectable()
class ListSpecificationsUsecase {

    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRespository) {}

    async execute(): Promise<Specification[]> {
        return await this.specificationRepository.list();
    }
}

export { ListSpecificationsUsecase };