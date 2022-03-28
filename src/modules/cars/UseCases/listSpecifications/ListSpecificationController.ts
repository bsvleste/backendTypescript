import { Request, Response } from 'express';
import { ListSpecificationUseCase } from './ListSpecificationUseCase';
export class ListSpecificationsController{
  constructor(private listSpecificationUseCase:ListSpecificationUseCase){

  }
  handle(req:Request,res:Response):Response{
    const listSpecifications = this.listSpecificationUseCase.execute();
    return res.json(listSpecifications)
  }
}
