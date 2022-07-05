
import  listSpecificationsController  from '@modules/cars/UseCases/listSpecifications';
import {Router } from 'express'
import { CreateSpecificationController } from './../modules/cars/UseCases/createSpecifications/CreateSpecificationController';

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController()
specificationRoutes.post('/',createSpecificationController.handle)
specificationRoutes.get('/',(req,res)=>{
  console.log('Listando os dados');
  return  listSpecificationsController().handle(req,res)
})
export {specificationRoutes}
