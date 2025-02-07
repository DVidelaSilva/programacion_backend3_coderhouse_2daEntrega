import { Router } from "express";

import AdoptionsController from "../controllers/adoptions.controller.js";
import validateUpdateAdoptionDto from '../middlewares/validateUpdateAdoptionDto.js';



const adoptionRouter = Router()

const adoptionsController = new AdoptionsController()

adoptionRouter.post('/user/:uid/pet/:pid', adoptionsController.postAdoption)
adoptionRouter.get('/',  adoptionsController.getAdoptions)
adoptionRouter.get('/:aid',  adoptionsController.getAdoption)
adoptionRouter.patch('/:aid', validateUpdateAdoptionDto, adoptionsController.updateAdoption)
adoptionRouter.delete('/:aid',  adoptionsController.deleteAdoption)


export default adoptionRouter