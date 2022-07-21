import {Router} from 'express'
import { authenticonRoutes } from './authentication.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specifications.routes';
import { userRouters } from './users.routes';

const router = Router();

router.use("/categories",categoriesRoutes);
router.use("/specifications",specificationRoutes);
router.use("/users",userRouters);
router.use( authenticonRoutes);
export {router}
