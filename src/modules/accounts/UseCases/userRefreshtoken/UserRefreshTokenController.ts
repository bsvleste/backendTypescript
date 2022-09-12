import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserRefreshTokeUseCase } from "./UserRefreshTokeUseCase";


export class UserRefreshTokenController {
    async handle(req: Request, res: Response): Promise<Response> {
        const token = req.body.token || req.headers["x-access-token"] || req.query.token
        const userRefreshTokenUseCase = container.resolve(UserRefreshTokeUseCase)

        const refresh_token = await userRefreshTokenUseCase.execute(token)

        return res.json(refresh_token)
    }
}