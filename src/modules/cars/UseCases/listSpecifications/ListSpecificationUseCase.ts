import { Specification } from "@modules/cars/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

export class ListSpecificationUseCase{
  constructor(private specificationsRepository:ISpecificationRepository) {}

 async execute():Promise<Specification[]> {
    const listSpecifications = this.specificationsRepository.list();
    return listSpecifications
  }
}
