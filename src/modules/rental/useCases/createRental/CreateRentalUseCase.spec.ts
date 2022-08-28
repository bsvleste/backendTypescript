import { DaysDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysDateProvider"
import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from "@modules/rental/repositories/inMemory/RentalsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DaysDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DaysDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  })
  it("should be able to create a new rental", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description car",
      category_id: "category id",
      brand: "Car brand",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123"
    })
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
      user_id: "12345",

    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
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

  it("should be not be able to create a new rental whit invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "645321",
        car_id: "654321",
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError("Invalid return time"))

  })

})



