import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";


interface IRequest{
  name: string;
  description: string
}
export class CreateCategoryServices {
  constructor(private categoryRepository:ICategoriesRepository) {

  }

  execute({ name, description }:IRequest):void {
    const categoryAlreadyExist = this.categoryRepository.findByName(name);
    if (categoryAlreadyExist) {
      throw new Error('Category already exists');
    }
    this.categoryRepository.create({ name, description });
  }
}
