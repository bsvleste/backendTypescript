import { Router } from "express";
import multer from "multer";
import { CreateCarController } from "@modules/cars/UseCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import { ListAvailableCarsController } from '@modules/cars/UseCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/UseCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from "@modules/cars/UseCases/uploadCarImages/UploadCarImagesController";
import  uploadConfig  from '@config/upload';

const carRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController();
const uploadCarImageController = new  UploadCarImagesController();

const uploadCarImages= multer(uploadConfig.upload("./tmp/carImages"))

carRoutes.post('/', ensureAuthenticated, ensureIsAdmin, createCarController.handle);
carRoutes.post('/specifications/:id',ensureAuthenticated, ensureIsAdmin, createCarSpecificationsController.handle);
carRoutes.post('/images/:id',uploadCarImages.array("images"), uploadCarImageController.handle);
carRoutes.get('/available',  listAvailableCarsController.handle);

export { carRoutes };
