
import { SpecificationController } from '@modules/cars/controllers/SpecificationController';
import {Router } from 'express'

const specificationRoutes = Router();
const specificationController = new SpecificationController();
specificationRoutes.post('/', specificationController.create)
specificationRoutes.get('/', specificationController.list)

export {specificationRoutes}
