
import { ListSpecificationsController } from '@modules/cars/UseCases/listSpecifications/ListSpecificationController';
import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '@modules/cars/UseCases/createSpecifications/CreateSpecificationController';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()
specificationRoutes.post('/', ensureAuthenticated, ensureIsAdmin, createSpecificationController.handle)
specificationRoutes.get('/', listSpecificationsController.handle)
export { specificationRoutes }
