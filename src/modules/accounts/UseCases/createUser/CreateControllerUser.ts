import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateControllerUser{
  async handle(req:Request, res:Response):Promise<Response> {
    const {name,email,password,driver_license}= req.body
    const createUserUSeCase = container.resolve(CreateUserUseCase)
    await createUserUSeCase.execute({
      name,
      password,
      driver_license,
      email
    })
    return res.status(201).send("Cadastrado com succeso")
  }
}
