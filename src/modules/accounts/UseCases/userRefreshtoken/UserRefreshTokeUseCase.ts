
import auth from "@config/auth";
import { IUsersRefreshTokenRepository } from "@modules/accounts/repositories/IUsersRefresTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
    sub: string;
    email: string;
}
@injectable()
export class UserRefreshTokeUseCase {
    constructor(
        @inject("UserRefreshTokenRepository")
        private userRefreshTokenRepository: IUsersRefreshTokenRepository,
        @inject("DaysDateProvider")
        private dateProvider: IDateProvider
    ) {
    }
    async execute(token: string): Promise<string> {
        const { secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth;
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

        const user_id = sub
        const userToken = await this.userRefreshTokenRepository.findByUserIdAndRefreshToken(
            user_id, token)

        if (!userToken) {
            throw new AppError("Refresh Token does not exists!")
        }
        await this.userRefreshTokenRepository.deleteByUserId(userToken.user_id);

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: sub,
            expiresIn: expires_in_refresh_token
        })
        const expires_date = this.dateProvider.addDays(expires_refresh_token_days)
        await this.userRefreshTokenRepository.create({
            user_id,
            refresh_token,
            expires_date
        })

        return refresh_token
    }
}