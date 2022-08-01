import { AuthenticationUserController } from "@modules/accounts/UseCases/authentication/AuthenticationUserController";
import { Router } from "express";

const authenticonRoutes = Router()

const authenticationUserController = new AuthenticationUserController()
authenticonRoutes.post('/', authenticationUserController.handle)
export{authenticonRoutes}
