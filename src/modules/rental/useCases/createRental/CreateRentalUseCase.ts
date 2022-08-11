import { Rental } from "@modules/rental/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"


interface IRquest {
    user_id: string
    car_id: string
    expected_return_date: Date
}
@injectable()
export class CreateRentalUseCase {
    constructor(
      @inject("RentalsRepository")
      private rentalRepository: IRentalsRepository,
      @inject("DaysDateProvider")
        private dateProvider:IDateProvider
    ) { }
    async execute({ car_id, expected_return_date, user_id }: IRquest): Promise<Rental> {
        const minimumRentalHour = 24
        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

        if (carUnavailable) {
            throw new AppError("Car is unavailable")
        }
        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!")
        }

        const dateNow = this.dateProvider.dateNow();
        const compareDate = this.dateProvider.compareInHours(dateNow,expected_return_date)

        console.log(compareDate)
        if(compareDate < minimumRentalHour ){
          throw new AppError("Invalid return time")
        }
        const rental = await this.rentalRepository.create({
            car_id,
            user_id,
            expected_return_date
        })

        return rental
    }
}
