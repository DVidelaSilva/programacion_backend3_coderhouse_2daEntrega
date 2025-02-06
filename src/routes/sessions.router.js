import { Router } from "express";

import SessionsController from "../controllers/sessions.controller.js";
import validateCreateUserDto from '../middlewares/validateCreateUserDto.js';
import validateUpdateUserDto from "../middlewares/validateUpdateUserDto.js";
import validateLoginUserDto from '../middlewares/validateLoginUserDto.js'

const sessionRouter = Router()

const sessionsController = new SessionsController()


sessionRouter.post('/register',  validateCreateUserDto, sessionsController.postRegisterUsers)
sessionRouter.post('/login', validateLoginUserDto, sessionsController.postSessionLogin)




export default sessionRouter