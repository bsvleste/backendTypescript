import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepositoris";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureIsAdmin(req: Request, res: Response, next: NextFunction) {

    const { id } = req.user
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id)

    if (!user.isAdmin) {
        throw new AppError("User isn't admin")
    }
    return next();
}