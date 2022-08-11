import { RentalsRepositoryInMemory } from "@modules/rental/repositories/inMemory/RentalsRepositoryInMemory"
import { DaysDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysDateProvider"
import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DaysDateProvider

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        dayjsDateProvider = new DaysDateProvider()
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory,dayjsDateProvider);
    })


    it(" should not be able to create a new rental if there is another open to the same user ", async () => {
      await rentalsRepositoryInMemory.create({
        car_id: "1111",
        expected_return_date: dayAdd24Hours,
        user_id: "12345",
      });

      await expect(
        createRentalUseCase.execute({
          user_id: "12345",
          car_id: "121212",
          expected_return_date: dayAdd24Hours,
        })
      ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
    });
    it(" should not be able to create a new rental if there is another open to the same car ", async () => {
      await rentalsRepositoryInMemory.create({
        car_id: "test",
        expected_return_date: dayAdd24Hours,
        user_id: "12345",
      });

      await expect(
        createRentalUseCase.execute({
          user_id: "654321",
          car_id: "test",
          expected_return_date: dayAdd24Hours,
        })
      ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("should be not be able to create a new rental whit invalid return time",async()=>{
     await expect(
          createRentalUseCase.execute({
          user_id: "645321",
          car_id: "654321",
          expected_return_date: dayjs().toDate()
        })
      ).rejects.toBeInstanceOf(AppError)

    })

  })



