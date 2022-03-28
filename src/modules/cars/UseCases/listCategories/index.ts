import { ListCategoriesController } from "./ListCategoriesController";
import { LIstCategoriesUseCase } from "./LIstCategoriesUseCase";
import { CategoryRepository } from './../../repositories/CategoriesRepository';


const categoriesRepository =  CategoryRepository.getInstance();
const listCategorisUseCase = new LIstCategoriesUseCase(categoriesRepository)
const listCategoriesController = new ListCategoriesController(listCategorisUseCase);

export { listCategoriesController}
