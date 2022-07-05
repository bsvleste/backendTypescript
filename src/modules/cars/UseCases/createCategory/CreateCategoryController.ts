
import {Request,Response} from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import {container}from 'tsyringe'
export class CreateCategoryController{

  async handle(req:Request,res:Response):Promise<Response>{
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
    const {name,description} = req.body
    await createCategoryUseCase.execute({name,description})
    return res.status(201).json({message:"Cadastrodo com sucesso"});
  }

  }





