import { Repository } from 'typeorm';
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { CarImage } from "../entities/CarImage";
import { myDataSource } from '@shared/infra/typeorm/app-data-source';

export class CarsImageRepository implements ICarsImageRepository{
  private repository: Repository<CarImage>

  constructor(){
    this.repository = myDataSource.getRepository(CarImage)
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name
    })
    await this.repository.save(carImage)
    return carImage
  }

}
