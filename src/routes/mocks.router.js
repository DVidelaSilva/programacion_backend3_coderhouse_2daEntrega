import { Router } from "express";
import validateCreateMockDto from '../middlewares/validateCreateMockDto.js'
import MocksController from "../controllers/mocks.controller.js";

const mockRouter = Router()

const mocksController = new MocksController()


mockRouter.get('/mockingusers', mocksController.getUsersFaker)
mockRouter.get('/mockingpets', mocksController.getPetsFaker)
mockRouter.post('/generatedata', validateCreateMockDto, mocksController.postGenerateData)


export default mockRouter