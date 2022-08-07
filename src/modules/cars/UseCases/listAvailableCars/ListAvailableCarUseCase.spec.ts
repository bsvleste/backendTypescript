
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarUseCase } from './ListAvailableCarUseCase';

let listCarUseCase:ListAvailableCarUseCase
let carsRepositoryInMemory:CarsRepositoryInMemory
describe("List Cars",()=>{

  beforeEach(()=>{
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarUseCase = new ListAvailableCarUseCase(carsRepositoryInMemory);
  })
  it("should be able to list all avaliable",async()=>{
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description car",
      category_id: "category id",
      brand: "Car brand",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-123"
    })

    const cars = await listCarUseCase.execute({

    })
    expect(cars).toEqual([car])
  })

  it("should by list all cars by name",async()=>{
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      category_id: "category id",
      brand: "Car brand",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-124"
    })

    const cars = await listCarUseCase.execute({
     name:"Car2"
    })
    expect(cars).toEqual([car])
  }),
  it("should by list all cars by brand",async()=>{
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Description car",
      category_id: "category id",
      brand: "Car brand",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-124"
    })

    const cars = await listCarUseCase.execute({
     brand:"Car brand"
    })
    expect(cars).toEqual([car])
  }),
  it("should by list all cars by category_id",async()=>{
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Description car",
      category_id: "category id",
      brand: "Car brand",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-124"
    })

    const cars = await listCarUseCase.execute({
     category_id:"category id"
    })
    expect(cars).toEqual([car])
  })
})
