import { Request, Response } from 'express';
import { LIstCategoriesUseCase } from './LIstCategoriesUseCase';
export class ListCategoriesController{
  constructor(private listCategoriesUseCase:LIstCategoriesUseCase){

  }
  handle(req:Request,res:Response):Response{
    const listCategories = this.listCategoriesUseCase.execute();
    return res.json(listCategories)
  }
}
