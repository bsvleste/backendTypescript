import multer from 'multer';
import { CreateCategoryController } from '@modules/cars/UseCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/cars/UseCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '@modules/cars/UseCases/importCategory/ImportCategoryController';
import { Router } from 'express'
const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
})
const createCategoryController = new CreateCategoryController();
const createImportCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()
categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.get("/", listCategoriesController.handle)
categoriesRoutes.post('/import', upload.single("file"), createImportCategoryController.handle)


export { categoriesRoutes }
