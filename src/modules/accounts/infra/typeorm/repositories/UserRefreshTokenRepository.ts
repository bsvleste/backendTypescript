import { ICreateUserRefreshTokenDTO } from "@modules/accounts/dtos/ICreateUserRefreshTokenDTO";
import { IUsersRefreshTokenRepository } from "@modules/accounts/repositories/IUsersRefresTokenRepository";
import { myDataSource } from "@shared/infra/typeorm/app-data-source";
import { Repository } from "typeorm";
import { UserRefreshTokens } from "../entities/UserRefreshTokens";


export class UserRefreshTokenRepository implements IUsersRefreshTokenRepository {

    private userRefreshTokenRepository: Repository<UserRefreshTokens>
    constructor() {
        this.userRefreshTokenRepository = myDataSource.getRepository(UserRefreshTokens)
    }
    async deleteByUserId(id: string): Promise<void> {
        const tokenDeleted = this.userRefreshTokenRepository.delete({ id })
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserRefreshTokens> {
        const userTokens = this.userRefreshTokenRepository.findOneBy({ user_id, refresh_token })
        return userTokens
    }
    async create({ user_id, refresh_token, expires_date }: ICreateUserRefreshTokenDTO): Promise<UserRefreshTokens> {

        const createUserRefreshToken = this.userRefreshTokenRepository.create({
            user_id,
            refresh_token,
            expires_date
        })
        await this.userRefreshTokenRepository.save(createUserRefreshToken)

        return createUserRefreshToken
    }



}

