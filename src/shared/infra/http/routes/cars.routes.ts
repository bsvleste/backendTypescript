import { CreateCarController } from "@modules/cars/UseCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const carRoutes = Router();
const createCarController = new CreateCarController;
carRoutes.post('/', ensureAuthenticated, ensureIsAdmin, createCarController.handle);
export { carRoutes }