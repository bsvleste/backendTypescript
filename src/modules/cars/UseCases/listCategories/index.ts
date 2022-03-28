import { CategoryRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { LIstCategoriesUseCase } from "./LIstCategoriesUseCase";


const categoriesRepository =  CategoryRepository.getInstance();
const listCategorisUseCase = new LIstCategoriesUseCase(categoriesRepository)
const listCategoriesController = new ListCategoriesController(listCategorisUseCase);

export { listCategoriesController}
