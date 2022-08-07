import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Cars";

export interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>
    findAvailable(brand?:string,category_id?:string,name?:string):Promise<Car[]>
    findByLicensePlate(license_plate: string): Promise<Car>
    findById(car_id: string): Promise<Car>
}