import { CreateCarController } from "@modules/cars/UseCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import { ListAvailableCarsController } from './../../../../modules/cars/UseCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from './../../../../modules/cars/UseCases/createCarSpecification/CreateCarSpecificationController';

const carRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController();
carRoutes.post('/', ensureAuthenticated, ensureIsAdmin, createCarController.handle);
carRoutes.post('/specifications/:id', createCarSpecificationsController.handle);
carRoutes.get('/available', listAvailableCarsController.handle);
export { carRoutes }
