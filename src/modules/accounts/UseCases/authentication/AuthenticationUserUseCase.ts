import { inject, injectable } from "tsyringe"
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRespository';
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from '@shared/errors/AppError';
import { IUsersRefreshTokenRepository } from "@modules/accounts/repositories/IUsersRefresTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string,
  refresh_token:string
}
@injectable()
export class AuthenticationUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UserRefreshTokenRepository")
    private userRefreshTokensRepository :IUsersRefreshTokenRepository,
    @inject("DaysDateProvider")
    private dateProvider: IDateProvider

  ) { }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const{expires_in_token,secret_token,secret_refresh_token,expires_in_refresh_token,expires_refresh_token_days} = auth
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError("Email or password incorrect", 401)
    }
    const comparePassword = compare(user.password, password)
    if (!comparePassword) {

      throw new AppError("Email or password incorrect", 401)
    }
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    });

    const refresh_token = sign({email}, secret_refresh_token,{
      subject:user.id,
      expiresIn:expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)
    await this.userRefreshTokensRepository.create({
      user_id:user.id,
      refresh_token,
      expires_date:refresh_token_expires_date
    })
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    }
    return tokenReturn

  }
}
