import "reflect-metadata"
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Cars';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}
@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ) { }
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carRepository.findById(car_id)
    if (!carExists) {
      throw new AppError("Car does not Exists")
    }
    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    )
    carExists.specifications = specifications;

    await this.carRepository.create(carExists)

    return carExists
  }
}
