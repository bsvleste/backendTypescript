import { AuthenticationUserController } from "@modules/accounts/UseCases/authentication/AuthenticationUserController";
import { Router } from "express";

const authenticationRoutes = Router()

const authenticationUserController = new AuthenticationUserController()
authenticationRoutes.post('/', authenticationUserController.handle)
export{authenticationRoutes}
