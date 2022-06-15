
import { createSpecificationController } from '@modules/cars/UseCases/createSpecifications';
import { listSpecificationsController } from '@modules/cars/UseCases/listSpecifications';
import {Router } from 'express'

const specificationRoutes = Router();
specificationRoutes.post('/',(req,res)=>{
  console.log('Cadastrando os dados');
  return  createSpecificationController.handle(req,res)
})
specificationRoutes.get('/',(req,res)=>{
  console.log('Listando os dados');
  return  listSpecificationsController.handle(req,res)
})
export {specificationRoutes}
