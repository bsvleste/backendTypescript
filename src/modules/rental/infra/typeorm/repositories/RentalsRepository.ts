
import { ICreateRentalDTO } from '@modules/rental/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rental/repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';
import { Repository } from 'typeorm';
import { myDataSource } from '@shared/infra/typeorm/app-data-source';

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>
  constructor() {
    this.repository = myDataSource.getRepository(Rental)
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"]
    })
    return rentals
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOneBy({ id })
    return rental
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    })
    return openByCar
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    })
    return openByUser
  }
  async create({ car_id, expected_return_date, user_id, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {

    const createRental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total
    })
    await this.repository.save(createRental)

    return createRental
  }

}
