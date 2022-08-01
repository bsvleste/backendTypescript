import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRespository";
import { Repository } from 'typeorm';
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { myDataSource } from "@shared/infra/typeorm/app-data-source";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = myDataSource.getRepository(User);
  }
  async findById(id: string): Promise<User> {
    const userId = await this.repository.findOneBy({ id })
    return userId

  }
  async findByEmail(email: string): Promise<User> {
    const userEmail = await this.repository.findOneBy({ email })
    return userEmail
  }
  async create({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id
    });
    await this.repository.save(user)
  }
}
