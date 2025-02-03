import { Router } from "express";

import PetsController from "../controllers/pets.controller.js";
import validateCreatePetDto from '../middlewares/validateCreatePetDto.js';
import validateUpdatePetDto from '../middlewares/validateUpdatePetDto.js';


const petRouter = Router()

const petsController = new PetsController()

petRouter.post('/', validateCreatePetDto, petsController.postPets)
petRouter.get('/',  petsController.getPets)
petRouter.get('/:id',  petsController.getPet)
petRouter.patch('/:id',  validateUpdatePetDto, petsController.updatePet)
petRouter.delete('/:id', petsController.deletePet)



export default petRouter