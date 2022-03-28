import { Category } from '../models/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from './ICategoriesRepository';


//padrao de projeto singleton
export class CategoryRepository implements ICategoriesRepository {
  private categories:Category[];

  private static INSTANCE: CategoryRepository;
  private constructor() {
    this.categories = [];
  }
  public static getInstance():CategoryRepository{
      if(!CategoryRepository.INSTANCE){
        CategoryRepository.INSTANCE = new CategoryRepository()
      }
      return CategoryRepository.INSTANCE
  }

  create({ name, description }:ICreateCategoryDTO):void {
    const category = new Category();
    Object.assign(
      category,
      {
        name,
        description,
        create_at: new Date(),
      },
    );
    this.categories.push(category);
  }

  list():Category[] {
    return this.categories;
  }

  findByName(name:string):Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}
