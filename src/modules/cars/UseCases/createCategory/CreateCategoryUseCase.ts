import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";


interface IRequest {
  name: string;
  description: string
}
export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {

  }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoryRepository.findByName(name);
    if (categoryAlreadyExist) {
      throw new Error('Category already exists');
    }
    this.categoryRepository.create({ name, description });
  }
}
