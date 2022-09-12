import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError'
import auth from '@config/auth';
import { UserRefreshTokens } from '@modules/accounts/infra/typeorm/entities/UserRefreshTokens';
import { UserRefreshTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserRefreshTokenRepository';
interface IPlayload {
  sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;
  const userRefreshTokenRepository = new UserRefreshTokenRepository();
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: userId } = verify(
      token,
      auth.secret_refresh_token) as IPlayload

    const user = await userRefreshTokenRepository.findByUserIdAndRefreshToken(userId, token)

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
