import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";


export class ListRentalsByUserController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { id: userId } = req.user
        const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)

        const rentals = await listRentalsByUserUseCase.execute(userId)
        return res.status(200).json(rentals)
    }
}