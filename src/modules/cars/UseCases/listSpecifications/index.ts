import { SpecificationRepository } from "@modules/cars/repositories/implementations/SpecificationRepository";
import { ListSpecificationsController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

const listReposiroty =  SpecificationRepository.getInstance();
const listSpecificationUseCase = new ListSpecificationUseCase(listReposiroty)
const listSpecificationsController = new ListSpecificationsController(listSpecificationUseCase);

export { listSpecificationsController}
