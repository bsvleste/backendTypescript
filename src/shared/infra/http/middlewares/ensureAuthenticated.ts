import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepositoris';
import { AppError } from '@shared/errors/AppError'
interface IPlayload {
  sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: userId } = verify(token, "aad36f93de62af67da06c264e0715ead0a20326e") as IPlayload
    const userRepository = new UsersRepository()
    const user = userRepository.findById(userId)

    if (!user) {
      throw new AppError("User does not exists", 401)
    }
    req.user = {
      id: userId
    }
    next();
  } catch {
    throw new AppError(`Invalid token`, 401)
  }

  return
}
