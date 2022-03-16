import { CategoryController } from '@modules/cars/controllers/CategoryController';
import {Router } from 'express'

const categoriesRoutes = Router();
const categoriController = new CategoryController();
categoriesRoutes.post('/', categoriController.create)
categoriesRoutes.get('/', categoriController.list)

export {categoriesRoutes}
