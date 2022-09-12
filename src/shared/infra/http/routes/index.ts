import { Router } from 'express'
import { authenticationRoutes } from './authentication.routes';
import { carRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationRoutes } from './specifications.routes';
import { userRouters } from './users.routes';

const router = Router();

router.use("/cars", carRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRouters);
router.use("/rentals", rentalRoutes);
router.use("/sessions", authenticationRoutes);
router.use("/password", passwordRoutes);
export { router }
