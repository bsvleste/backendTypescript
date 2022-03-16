import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
interface IRequest{
  name:string,
  description:string
}
export class CreateSpecificationServices{
  constructor(private specificationsRepository:ISpecificationRepository){

  }
  execute({name,description}:IRequest):void{
    const specification =  this.specificationsRepository.findByName(name)
    if(specification)
    throw new Error("Specification already exists")
    this.specificationsRepository.create({ name, description})
  }
}
