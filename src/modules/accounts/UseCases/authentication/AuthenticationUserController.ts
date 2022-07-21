import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';

export class AuthenticationUserController{

  async handle(req:Request,res:Response):Promise<Response>{
    const {email,password}= req.body
    const authenticationUserUseCase = container.resolve(AuthenticationUserUseCase)
    const authenticationInfo = await authenticationUserUseCase.execute({
      email,password
    })
    return res.status(200).json(authenticationInfo)
  }

}
