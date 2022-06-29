import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from './../../entities/Category';

export class LIstCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {
    const listCategories = await this.categoryRepository.list()

    return listCategories
  }
}
