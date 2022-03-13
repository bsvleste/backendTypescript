import { CategoryController } from '@controllers/CategoryController';
import { Category } from '@models/Category';
import { CategoryRepository } from '@repositories/CategoriesRepository';
import {Router } from 'express'
import { v4 as uuidV4  }from 'uuid'

const   categoriesRoutes = Router();
const categoriController = new CategoryController();
categoriesRoutes.post('/', categoriController.create)
categoriesRoutes.get('/', categoriController.list)

export {categoriesRoutes}