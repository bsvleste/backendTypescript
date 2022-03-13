import { Category } from "@models/Category";
import { CategoryRepository } from "@repositories/CategoriesRepository";
import { CreateCategoryServices } from "@services/CreateCategoryServices";
import {Request,Response} from 'express'

const categoryRepository = new CategoryRepository();

export class CategoryController{
  create(req:Request,res:Response){
    const {name,description} = req.body
    const createCategoryServices = new CreateCategoryServices(categoryRepository); 
    createCategoryServices.execute({name,description})
    return res.status(201).json({message:"Cadastrodo com sucesso"});
    }

    list(req:Request,res:Response){
      const listaCategories = categoryRepository.list();
      return res.status(201).json(listaCategories) 
    }
      
  }
   
  
  


