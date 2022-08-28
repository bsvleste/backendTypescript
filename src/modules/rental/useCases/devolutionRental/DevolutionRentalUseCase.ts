import { inject, injectable } from "tsyringe";
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rental/repositories/IRentalsRepository';
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
export class DevolutionRentalUseCase {

  constructor(
    @inject("DaysDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
  ) { }
  async execute({ id, userId }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id)
    const minimumDaily = 1;
    if (!rental) {
      throw new AppError('Rental not found');
    }
    const dateNow = this.dateProvider.dateNow();

    let dailyRate = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    )
    if (dailyRate <= 0) {
      dailyRate = minimumDaily;
    }


    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    )
    let total = 0;
    if (delay > 0) {
      const calculateFine = delay * car.fine_amount
      total = calculateFine
    }
    total += dailyRate * car.daily_rate

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental)

    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}
