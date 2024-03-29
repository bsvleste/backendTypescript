import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";


export class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = []

    async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental()

        Object.assign(rental, {
            car_id,
            user_id,
            start_date: new Date(),
            expected_return_date
        })

        this.rentals.push(rental)

        return rental
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date)
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date)
    }
    async findById(id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.id === id)
    }
    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter((rental) => rental.user_id === user_id);
    }

}
