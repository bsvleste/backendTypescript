import {inject,injectable}from 'tsyringe'
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import {AppError} from '../../../../errors/AppError';


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
    const specificationAlreadyExists =  await this.specificationsRepository.findByName(name)
    if(specificationAlreadyExists)
    throw new AppError("Specification already exists",401)
    await this.specificationsRepository.create({ name, description})
  }
}
