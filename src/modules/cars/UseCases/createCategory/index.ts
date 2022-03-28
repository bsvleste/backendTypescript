import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { CreateCategoryController } from './CreateCategoryController';
import { CategoryRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';

const categoryRepository =  CategoryRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController, createCategoryUseCase}
