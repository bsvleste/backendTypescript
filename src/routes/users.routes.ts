import { Router } from "express";
import { CreateControllerUser } from './../modules/accounts/UseCases/createUser/CreateControllerUser';
import { CreateUserUseCase } from './../modules/accounts/UseCases/createUser/CreateUserUseCase';

const userRouters = Router()

const createControllerUser = new CreateControllerUser()

userRouters.post("/",createControllerUser.handle)

export {userRouters}
