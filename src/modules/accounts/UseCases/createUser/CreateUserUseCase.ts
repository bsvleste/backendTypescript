import { inject, injectable } from "tsyringe";
import { IUsersRepository } from '../../repositories/IUsersRespository';
import { ICreateUserDTO } from './../../dtos/ICreateUserDTO';
import {hash} from 'bcrypt'

@injectable()
export class CreateUserUseCase{
  constructor(
    @inject("UsersRepository")
    private userRepository:IUsersRepository
  ){}
  async execute({name,email,driver_license,password}:ICreateUserDTO):Promise<void> {

    const userEmailAlreadyExists = await this.userRepository.findByEmail(email);
    if(userEmailAlreadyExists){
      throw new Error("User email already exists")
    }
    const passwordHash = await hash(password,8)
    await this.userRepository.create({
      name,
      email,
      password:passwordHash,
      driver_license
    })
  }
}
