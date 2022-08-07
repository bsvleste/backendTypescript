import { CreateCarController } from "@modules/cars/UseCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import { ListAvailableCarsController } from './../../../../modules/cars/UseCases/listAvailableCars/ListAvailableCarsController';

const carRoutes = Router();
const createCarController = new CreateCarController;
const listAvailableCarsController = new ListAvailableCarsController;

carRoutes.post('/', ensureAuthenticated, ensureIsAdmin, createCarController.handle);
carRoutes.get('/available', listAvailableCarsController.handle);
export { carRoutes }
