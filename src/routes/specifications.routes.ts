
import { ListSpecificationsController } from '@modules/cars/UseCases/listSpecifications/ListSpecificationController';
import {Router } from 'express'
import { ensureAutehnticated } from 'src/middlewares/ensureAuthenticated';
import { CreateSpecificationController } from './../modules/cars/UseCases/createSpecifications/CreateSpecificationController';

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()
specificationRoutes.post('/',createSpecificationController.handle)
specificationRoutes.get('/',ensureAutehnticated, listSpecificationsController.handle)
export {specificationRoutes}
