import "reflect-metadata";

import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { AppError } from '@shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
describe("Create Category", () => {
    let createCategoryUseCase: CreateCategoryUseCase
    let categoryRepositoryInMemory: CategoriesRepositoryInMemory;
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory)
    })

    it("should be able to create a new category", async () => {

        const category = {
            name: "Category Test",
            description: "Category description test"
        }
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryTest = await categoryRepositoryInMemory.findByName(category.name)

        expect(categoryTest).toHaveProperty("id")
    })
    it("should not be able to create a new category with same name exists", async () => {
        const category = {
            name: "Category test",
            description: "Category description test"
        }
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })
        await expect(
            createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        ).rejects.toEqual(new AppError("Category already exists"))

    })
})
