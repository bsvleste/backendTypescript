import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from "@shared/errors/AppError";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carRepositoryInMemory: CarsRepositoryInMemory
let specificationsInMemory: SpecificationRepositoryInMemory
describe("Car specification", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory,
      specificationsInMemory
    )
  })
  it("should not be able to add a new specification to an now existent car", async () => {
    const specifications_id = ["5321"]
    const car_id = '123';
    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError("Car does not Exists"))
  })
  it("should be able to add a new specification to the car", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Name Car2",
      description: "Description car",
      category_id: "category id",
      brand: "Car brand",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123"
    })
    const specifications = await specificationsInMemory.create({
      name: "test",
      description: "test"
    })
    const specifications_id = [specifications.id]
    const specificationsCar = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
    expect(specificationsCar).toHaveProperty('specifications')
    expect(specificationsCar.specifications.length).toBe(1)
  })
})
