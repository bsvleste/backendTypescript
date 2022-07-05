import {container}from 'tsyringe'
import { Request, Response } from "express";
import {CreateSpecificationUseCase} from '../createSpecifications/CreateSpecificationUseCase'

export class CreateSpecificationController{


  async handle(req:Request,res:Response):Promise<Response>{
    const createSpecificationsUseCase = container.resolve(CreateSpecificationUseCase)
    const {name,description} = req.body;
    createSpecificationsUseCase.execute({name,description})
    return res.status(201).json({message:"Cadastrodo com sucesso"});
 }

}
