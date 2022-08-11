
import { ICreateRentalDTO } from '@modules/rental/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rental/repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';
import { Repository } from 'typeorm';
import { myDataSource } from '@shared/infra/typeorm/app-data-source';

export class RentalsRepository implements IRentalsRepository{
  private repository :Repository<Rental>
  constructor(){
    this.repository = myDataSource.getRepository(Rental)
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOneBy({car_id})
    return openByCar
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOneBy({user_id})
    return openByUser
  }
  async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {

    const createRental = this.repository.create({
      car_id,
      expected_return_date,
      user_id
    })
    await  this.repository.save(createRental)

    return createRental
  }

}
