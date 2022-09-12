import { AuthenticationUserController } from "@modules/accounts/UseCases/authentication/AuthenticationUserController";
import { UserRefreshTokenController } from "@modules/accounts/UseCases/userRefreshtoken/UserRefreshTokenController";
import { Router } from "express";

const authenticationRoutes = Router()

const authenticationUserController = new AuthenticationUserController()
const userRefreshTokenController = new UserRefreshTokenController();
authenticationRoutes.post('/', authenticationUserController.handle)
authenticationRoutes.post('/refresh-token', userRefreshTokenController.handle)
export { authenticationRoutes }
