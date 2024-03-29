import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
export class CategoriesRepositoryInMemory implements ICategoriesRepository {

    categories: Category[] = []

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name)
        return category
    }
    async list(): Promise<Category[]> {
        const listAllCategories = this.categories
        return listAllCategories
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {

        const category = new Category();

        Object.assign(category, {
            name, description
        })
        this.categories.push(category)
    }
}