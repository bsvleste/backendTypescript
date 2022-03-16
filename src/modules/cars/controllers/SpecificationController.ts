import { Request, Response } from "express";
import { SpecificationRepository } from "../repositories/SpecificationRepository";
import { CreateSpecificationServices } from "../services/CreateSpecificationServices";

const specificationsRepository = new SpecificationRepository()
export class SpecificationController{
 create(req:Request,res:Response){
  const {name,description} = req.body;
  const createSpecificationServices = new CreateSpecificationServices(specificationsRepository)
  createSpecificationServices.execute({name,description})
  return res.status(201).json({message:"Cadastrodo com sucesso"});
 }
 list(req:Request,res:Response){
   const listSpecifications = specificationsRepository.list()
   return res.status(201).json(listSpecifications)
 }
}
