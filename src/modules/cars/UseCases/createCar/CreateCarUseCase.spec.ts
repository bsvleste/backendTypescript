import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
describe("Create car", () => {

    beforeAll(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })
    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description car",
            category_id: "category id",
            brand: "Car brand",
            daily_rate: 100,
            fine_amount: 60,
            license_plate: "ABC-123"
        });
        expect(car).toHaveProperty("id")
    })
    it("not be should create a car with exists licence plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name Car1",
                description: "Description car",
                category_id: "category id",
                brand: "Car brand",
                daily_rate: 100,
                fine_amount: 60,
                license_plate: "ABC-123"
            });
            await createCarUseCase.execute({
                name: "Name Car2",
                description: "Description car",
                category_id: "category id",
                brand: "Car brand",
                daily_rate: 100,
                fine_amount: 60,
                license_plate: "ABC-123"
            });
        }).rejects.toBeInstanceOf(AppError)
    })
    it("should be able create a car with avaliable true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Available Car",
            description: "Description car",
            category_id: "category id",
            brand: "Car brand",
            daily_rate: 100,
            fine_amount: 60,
            license_plate: "ABC-124"
        });
        expect(car.avaliable).toBe(true)
    })
})