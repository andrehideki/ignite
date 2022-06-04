import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUsecase } from "./ListSpecificationsUsecase";

const specificationsRepository = SpecificationRepository.getInstance();
const listSpecificationsUsecase = new ListSpecificationsUsecase(specificationsRepository);
const listSpecificationsController = new ListSpecificationsController(listSpecificationsUsecase);

export { listSpecificationsController };