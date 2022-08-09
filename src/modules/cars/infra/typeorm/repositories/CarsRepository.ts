import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { myDataSource } from "@shared/infra/typeorm/app-data-source";
import { Repository } from "typeorm";
import { Car } from "../entities/Cars";

export class CarsRepository implements ICarsRepository {

    private carRepository: Repository<Car>

    constructor() {
        this.carRepository = myDataSource.getRepository(Car)
    }
  async findById(id: string): Promise<Car> {
    const car  = await this.carRepository.findOneBy({id})
    return car;
  }
    async create(
        {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id

        }: ICreateCarDTO): Promise<Car> {
        const car = this.carRepository.create(
            {
                brand,
                category_id,
                daily_rate,
                description,
                fine_amount,
                license_plate,
                name,
                specifications,
                id
            });
        await this.carRepository.save(car)
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.carRepository.findOneBy({ license_plate })
        return car
    }
    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
      const carsQuery = this.carRepository.createQueryBuilder("c")
      .where("available = :available", {available:true});

      if(brand){
        carsQuery.andWhere("brand = :brand",{brand})
      }

      if(name){
        carsQuery.andWhere("name = :name",{name})
      }

      if(category_id){
        carsQuery.andWhere("category_id = :category_id",{category_id})
      }

      const cars =  await carsQuery.getMany();
      return cars;
    }

}
