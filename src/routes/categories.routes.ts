import multer from 'multer';
import { createCategoryController } from '@modules/cars/UseCases/createCategory';
import { listCategoriesController } from '@modules/cars/UseCases/listCategories';
import {Router } from 'express'
import { importCategoryController } from '@modules/cars/UseCases/importCategory';
const categoriesRoutes = Router();

const upload = multer({
  dest:"./tmp",
})
categoriesRoutes.post('/', (req,res)=>{
  console.log("Create funfiodaca12233")
  return  createCategoryController.handle(req,res)
})
categoriesRoutes.get("/",(req,res)=>{
  return listCategoriesController.handle(req,res);
})
categoriesRoutes.post('/import',upload.single("file"),(req,res)=>{
  return importCategoryController.handle(req,res)
})
export {categoriesRoutes}
