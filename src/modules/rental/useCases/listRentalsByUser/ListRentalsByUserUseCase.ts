import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { Rental } from "@modules/rental/infra/typeorm/entities/Rental";

@injectable()
export class ListRentalsByUserUseCase {

    constructor(
        @inject("RentalsRespository")
        private rentalsRepository: IRentalsRepository
    ) { }

    async execute(userId: string): Promise<Rental[]> {

        const rentalsByUser = await this.rentalsRepository.findByUser(userId)

        return rentalsByUser
    }

}