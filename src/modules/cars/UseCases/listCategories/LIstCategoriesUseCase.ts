import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from './../../models/Category';

export class LIstCategoriesUseCase{
  constructor(private categoryRepository:ICategoriesRepository) {}

  execute():Category[] {
    const listCategories = this.categoryRepository.list()

    return listCategories
  }
}
