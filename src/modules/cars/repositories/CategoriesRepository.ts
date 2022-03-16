import { Category } from '../models/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from './ICategoriesRepository';

export class CategoryRepository implements ICategoriesRepository {
  private categories:Category[];

  constructor() {
    this.categories = [];
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