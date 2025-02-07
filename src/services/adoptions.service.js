import AdoptionsRepository from '../repositories/adoptions.repository.js'
import {createHash} from '../configs/bcrypt.config.js'
import UsersService from "../services/users.service.js"
import UsersRepository from '../repositories/users.repository.js'
import PetsRepository from '../repositories/pets.repository.js'



class AdoptionsService {

    constructor(){
         this.adoptionsRepository = new AdoptionsRepository()
         this.usersRepository = new UsersRepository()
         this.petsRepository = new PetsRepository()
    }

    // Buscan en Tablas de Usuario y mascota

    findAdoptionUser = async (uid) => {
        const user = await this.usersRepository.findUserInDB({_id:uid})
        return user
    }
    
    findAdoptionPet = async (pid) => {
        const pet = await this.petsRepository.findPetInDB({_id:pid})
        return pet
    }


    // Actualizan en Tablas de Usuario y mascota

    updatePetAdopted = async (pid, body) => {

        const {adopted, owner} = body 

        const newPetAdopted = {
            adopted,
            owner
        }
        
        const adoptionPet = await this.petsRepository.updatePetInDB({_id:pid}, newPetAdopted)
        return adoptionPet
    }
    

    updateUserAdopted = async (uid, body) => {

        const {pets} = body 

        const newUserAdopted = {
            pets
        }
        
        const adoptionPet = await this.usersRepository.updateUserInDB({_id:uid}, newUserAdopted)
        return adoptionPet
    }


    // CRUD en Tabla de adopcion

    createAdoption = async (body) => {
        const {owner, pet} = body

        const newAdoption = {
            owner,
            pet
        }
        const adoption = await this.adoptionsRepository.createAdoptionInDB(newAdoption)
        return adoption
    }

    findAdoptions = async() => {
        const adoptions = await this.adoptionsRepository.findAllAdoptionInDB()
        return adoptions
    }

    findAdoption = async (aid) => {
        const adoption = await this.adoptionsRepository.findAdoptionInDB({_id:aid})
        return adoption
    }


    updateAdopted = async (aid, body) => {

        const {owner_id, pet_id} = body 

        const newAdopted = {
            owner: owner_id,
            pet: pet_id
        }
        
        const adoption = await this.adoptionsRepository.updateAdoptionInDB({_id:aid}, newAdopted)
        return adoption
    }


    deleteAdoption = async (aid) => {
        const adoption = await this.adoptionsRepository.deleteAdoptionInDB({_id:aid})
        return adoption
    }
    





}



export default AdoptionsService