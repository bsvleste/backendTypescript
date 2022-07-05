import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from './../../entities/Category';
import {inject,injectable}from 'tsyringe'

@injectable()
export class LIstCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {
    const listCategories = await this.categoryRepository.list()

    return listCategories
  }
}
