import { ICarsRepository } from '../../repositories/ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Cars';
import { inject, injectable } from 'tsyringe';

interface IRequest{
  category_id?:string;
  brand?:string;
  name?:string
}
@injectable()
export class ListAvailableCarUseCase{
  constructor(
    @inject("CarsRepository")
    private carsRepository:ICarsRepository
  ){}
  async execute({brand,category_id,name}:IRequest):Promise<Car[]>{

    const cars = await this.carsRepository.findAvailable(brand,category_id,name);
    return cars
  }
}
