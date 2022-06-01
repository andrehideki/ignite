import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

class ListSpecificationsUsecase {

    constructor(private specificationRepository: SpecificationRepository) {}

    execute() {
        return this.specificationRepository.list();
    }
}

export { ListSpecificationsUsecase };