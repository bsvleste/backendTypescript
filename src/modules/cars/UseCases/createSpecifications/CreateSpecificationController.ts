import { Request, Response } from "express";
import {CreateSpecificationUseCase} from '../createSpecifications/CreateSpecificationUseCase'

export class CreateSpecificationController{
  constructor(private createSpecificationsUseCase:CreateSpecificationUseCase){

  }
  handle(req:Request,res:Response){
   const {name,description} = req.body;
  this.createSpecificationsUseCase.execute({name,description})
  return res.status(201).json({message:"Cadastrodo com sucesso"});
 }

}
