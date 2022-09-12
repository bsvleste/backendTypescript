import { IUsersRefreshTokenRepository } from "@modules/accounts/repositories/IUsersRefresTokenRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRespository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from 'uuid'

@injectable()
export class SendForgotPasswordMailUseCase {

    constructor(

        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserRefreshTokenRepository")
        private userRefreshTokenRepository: IUsersRefreshTokenRepository,
        @inject("DaysDateProvider")
        private daysDateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider,
    
    ) {
    }
    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new AppError("User does not exists!")
        }
        const token = uuidV4()

        const expires_date = this.daysDateProvider.addHours(3);

        await this.userRefreshTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        })
        await this.mailProvider.sendMail(
            email,
            "Reset password",
            `O link for reset password ${token}`
        )
    }
}