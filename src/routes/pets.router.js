import { Router } from "express";

import PetsController from "../controllers/pets.controller.js";
import validateCreatePetDto from '../middlewares/validateCreatePetDto.js';


const petRouter = Router()

const petsController = new PetsController()

petRouter.post('/', validateCreatePetDto, petsController.postPets)
petRouter.get('/',  petsController.getPets)



export default petRouter