import { Request, Response } from 'express';
import { LIstCategoriesUseCase } from './LIstCategoriesUseCase';
export class ListCategoriesController {
  constructor(private listCategoriesUseCase: LIstCategoriesUseCase) {

  }
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategories = await this.listCategoriesUseCase.execute();
    return res.json(listCategories)
  }
}
