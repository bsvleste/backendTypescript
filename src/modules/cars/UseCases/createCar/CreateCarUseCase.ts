import { Car } from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string

}

@injectable()
export class CreateCarUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }
    async execute({
        name,
        description,
        category_id,
        brand,
        daily_rate,
        fine_amount,
        license_plate
    }: IRequest): Promise<Car> {

        const licensePlateCarAlreadyExist = await this.carsRepository.findByLicensePlate(license_plate)
        if (licensePlateCarAlreadyExist) {
            throw new AppError("License plate already exists")
        }
        const car = await this.carsRepository.create({
            name,
            description,
            category_id,
            brand,
            daily_rate,
            fine_amount,
            license_plate

        })
        return car
    }
}

