import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { CreateCategoryController } from './CreateCategoryController';
import { CategoryRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
export default (): CreateCategoryController => {

  const categoryRepository = new CategoryRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

  const createCategoryController = new CreateCategoryController(createCategoryUseCase)

  return createCategoryController
}
