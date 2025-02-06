import { Router } from "express";

import AdoptionsController from "../controllers/adoptions.controller.js";



const adoptionRouter = Router()

const adoptionsController = new AdoptionsController()

adoptionRouter.post('/:uid/pet/:pid', adoptionsController.postAdoption)
// petRouter.get('/',  petsController.getPets)
// petRouter.get('/:id',  petsController.getPet)
// petRouter.patch('/:id',  validateUpdatePetDto, petsController.updatePet)
// petRouter.delete('/:id', petsController.deletePet)



export default adoptionRouter