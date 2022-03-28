
import { createSpecificationController } from '@modules/cars/UseCases/createSpecifications';
import { listSpecificationsController } from '@modules/cars/UseCases/listSpecifications';
import {Router } from 'express'

const specificationRoutes = Router();
specificationRoutes.post('/',(req,res)=>{
  return  createSpecificationController.handle(req,res)
})
specificationRoutes.get('/',(req,res)=>{
  return  listSpecificationsController.handle(req,res)
})
export {specificationRoutes}
