import { Specification } from "@modules/cars/models/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

export class ListSpecificationUseCase{
  constructor(private specificationsRepository:ISpecificationRepository) {}

  execute():Specification[] {
    const listSpecifications = this.specificationsRepository.list();
    return listSpecifications
  }
}
