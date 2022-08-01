import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { LIstCategoriesUseCase } from "./LIstCategoriesUseCase";

export default (): ListCategoriesController => {

  const categoriesRepository = new CategoryRepository();
  const listCategorisUseCase = new LIstCategoriesUseCase(categoriesRepository)
  const listCategoriesController = new ListCategoriesController(listCategorisUseCase);

  return listCategoriesController
}
