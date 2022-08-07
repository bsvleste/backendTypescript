import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from './../../../../shared/errors/AppError';

interface IRequest{
  car_id:string;
  specification_id:string[];
}
export class CreateCarSpecificationUseCase{
  constructor(
    private carRepository:ICarsRepository
  ){}
  async execute({car_id,specification_id}:IRequest):Promise<void>{
    const carExists = await this.carRepository.findById(car_id)
    if(!carExists){
      throw new AppError("Car does not Exists ")
    }
  }
}
