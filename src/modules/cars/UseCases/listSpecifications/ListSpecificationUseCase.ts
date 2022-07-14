import { Specification } from "@modules/cars/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";
@injectable()
export class ListSpecificationUseCase{
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository:ISpecificationRepository) {}

 async execute():Promise<Specification[]> {
    const listSpecifications = this.specificationsRepository.list();
    return listSpecifications
  }
}
