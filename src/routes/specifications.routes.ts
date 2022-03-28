
import { SpecificationController } from '@modules/cars/UseCases/SpecificationController';
import {Router } from 'express'

const specificationRoutes = Router();
const specificationController = new SpecificationController();
specificationRoutes.post('/', specificationController.create)
specificationRoutes.get('/', specificationController.list)

export {specificationRoutes}
