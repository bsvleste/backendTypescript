import { inject, injectable } from "tsyringe"
import { IUsersRepository } from './../../repositories/IUsersRespository';
import {compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
interface IRequest{
  email:string
  password:string
 }

 interface IResponse{
  user:{
    name:string,
    email:string
  },
  token:string
 }
 @injectable()
export class AuthenticationUserUseCase{
  constructor(
    @inject("UsersRepository")
    private userRepository:IUsersRepository
  ){}
  async execute({email,password}:IRequest):Promise<IResponse>{
    const user = await this.userRepository.findByEmail(email)
    if(!user){
      throw new Error("Email or password incorret")
    }
    const comparePassword = compare(user.password,password)
    if(!comparePassword){
      throw new Error("Email or password incorret")
    }
    const token = sign({},"aad36f93de62af67da06c264e0715ead0a20326e",{
      subject:user.id,
      expiresIn:"1d"
    });
    const tokenReturn:IResponse ={
      token,
      user:{
        name:user.name,
        email:user.email
      }
    }
    return tokenReturn

  }
}
