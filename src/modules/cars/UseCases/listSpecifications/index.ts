import { SpecificationRepository } from "@modules/cars/repositories/implementations/SpecificationRepository";
import { ListSpecificationsController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export default():ListSpecificationsController=>{

  const listReposiroty =  new SpecificationRepository();
  const listSpecificationUseCase = new ListSpecificationUseCase(listReposiroty)
  const listSpecificationsController = new ListSpecificationsController(listSpecificationUseCase);

  return listSpecificationsController
}
