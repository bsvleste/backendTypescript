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

