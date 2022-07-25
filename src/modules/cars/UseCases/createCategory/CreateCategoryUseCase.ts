import {inject,injectable} from 'tsyringe'
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import {AppError} from '@errors/AppError';

interface IRequest {
  name: string;
  description: string
}
@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoryRepository.findByName(name);
    if (categoryAlreadyExist) {
      throw new AppError('Category already exists');
    }
     this.categoryRepository.create({ name, description });
  }
}
