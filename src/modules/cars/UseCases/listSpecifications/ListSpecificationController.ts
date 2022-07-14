import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListSpecificationUseCase } from './ListSpecificationUseCase';
export class ListSpecificationsController{

  async handle(req:Request,res:Response):Promise<Response>{
    const listSpecificationUseCase = container.resolve(ListSpecificationUseCase)
    const listSpecifications = await listSpecificationUseCase.execute();
    return res.json(listSpecifications)
  }
}
