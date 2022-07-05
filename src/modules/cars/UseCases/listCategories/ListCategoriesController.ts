import { Request, Response } from 'express';
import {container} from 'tsyringe'
import { LIstCategoriesUseCase } from './LIstCategoriesUseCase';

export class ListCategoriesController {

  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(LIstCategoriesUseCase)
    const listCategories = await listCategoriesUseCase.execute();
    return res.json(listCategories)
  }
}
