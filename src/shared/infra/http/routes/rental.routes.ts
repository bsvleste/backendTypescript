import { Router } from "express"
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rental/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from "@modules/rental/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rental/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUser = new ListRentalsByUserController()

rentalRoutes.post('', ensureAuthenticated, createRentalController.handle)
rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUser.handle)
rentalRoutes.post('/devolutions/:id', ensureAuthenticated, devolutionRentalController.handle)
export { rentalRoutes }
