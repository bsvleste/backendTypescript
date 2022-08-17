import { inject, injectable } from "tsyringe"
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRespository';
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}
@injectable()
export class AuthenticationUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) { }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError("Email or password incorrect", 401)
    }
    const comparePassword = compare(user.password, password)
    if (!comparePassword) {

      throw new AppError("Email or password incorrect", 401)
    }
    const token = sign({}, "aad36f93de62af67da06c264e0715ead0a20326e", {
      subject: user.id,
      expiresIn: "1d"
    });
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }
    return tokenReturn

  }
}
