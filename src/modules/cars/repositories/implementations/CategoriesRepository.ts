import { Category } from "@modules/cars/entities/Category";
import { getRepository, Repository } from "typeorm";
import { myDataSource } from "src/database/app-data-source";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

export class CategoryRepository implements ICategoriesRepository {

  private repository : Repository<Category>

  private static INSTANCE: CategoryRepository;
  constructor() {
    this.repository = myDataSource.getRepository(Category);
  }


  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name, description
    })
    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name })
    return category;
  }
}
