import {inject,injectable}from 'tsyringe'
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
interface IRequest{
  name:string,
  description:string
}
@injectable()
export class CreateSpecificationUseCase{
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository:ISpecificationRepository){

  }
  async execute({name,description}:IRequest):Promise<void>{
    const specificationAlreadyExists =  this.specificationsRepository.findByName(name)
    if(specificationAlreadyExists)
    throw new Error("Specification already exists")
    await this.specificationsRepository.create({ name, description})
  }
}
