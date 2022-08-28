import { ICreateUserRefreshTokenDTO } from "../dtos/ICreateUserRefreshTokenDTO";
import { UserRefreshTokens } from "../infra/typeorm/entities/UserRefreshTokens";


export interface IUsersRefreshTokenRepository {
    create({ user_id, refresh_token, expires_date }: ICreateUserRefreshTokenDTO): Promise<UserRefreshTokens>
}