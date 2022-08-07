import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from "@shared/errors/AppError";

let createCarSpecificationUseCase:CreateCarSpecificationUseCase
let carRepositoryInMemory:CarsRepositoryInMemory
describe("Car specificatiion",()=>{
  beforeEach(()=>{
    carRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carRepositoryInMemory)
  })
  it("should not be able to add a new specification to an now existent car",async()=>{
    expect(async ()=>{
      const specification_id = ["5321"]
      const car_id = '123';
      await createCarSpecificationUseCase.execute({car_id,specification_id});
    }).rejects.toBeInstanceOf(AppError)
  })
  it("should be able to add a new specification to the car",async()=>{
    const car = await carRepositoryInMemory.create({
      name: "Name Car2",
      description: "Description car",
      category_id: "category id",
      brand: "Car brand",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123"
    })
    const specification_id = ["5321"]
    await createCarSpecificationUseCase.execute({car_id:car.id,specification_id});
  })
})
