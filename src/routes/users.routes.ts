import { Router } from "express";
import multer from 'multer';
import { CreateControllerUser } from './../modules/accounts/UseCases/createUser/CreateControllerUser';
import { UpdateUserAvatarController } from './../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from 'src/middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload'
const userRouters = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar/'))

const createControllerUser = new CreateControllerUser()
const updateUserAvatarController = new UpdateUserAvatarController()
userRouters.post("/",createControllerUser.handle)
userRouters.patch("/avatar",ensureAuthenticated,uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export {userRouters}
