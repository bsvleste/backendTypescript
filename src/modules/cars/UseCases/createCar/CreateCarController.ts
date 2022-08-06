import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            name,
            description,
            category_id,
            brand,
            daily_rate,
            fine_amount,
            license_plate } = req.body;
        const createCar = container.resolve(CreateCarUseCase)
        const car = await createCar.execute(
            {
                name,
                description,
                category_id,
                brand,
                daily_rate,
                fine_amount,
                license_plate
            }
        )
        return res.status(201).json(car)
    }
}