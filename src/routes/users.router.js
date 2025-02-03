import { Router } from "express";

import UsersController from "../controllers/users.controller.js";
import validateCreateUserDto from '../middlewares/validateCreateUserDto.js';
import validateUpdateUserDto from "../middlewares/validateUpdateUserDto.js";

const userRouter = Router()

const usersController = new UsersController()


userRouter.get('/',  usersController.getUsers)
userRouter.get('/:id',  usersController.getUser)
userRouter.post('/', validateCreateUserDto, usersController.postUsers)
userRouter.patch('/:id', validateUpdateUserDto, usersController.updateUser)
userRouter.delete('/:id', usersController.deleteUser)



export default userRouter