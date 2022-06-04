import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUsecase } from "./CreateSpecificationUsecase";

const specificationRespository = SpecificationRepository.getInstance();
const createSpecificationUsecase = new CreateSpecificationUsecase(specificationRespository);
const createSpecificationController = new CreateSpecificationController(createSpecificationUsecase);

export { createSpecificationController };