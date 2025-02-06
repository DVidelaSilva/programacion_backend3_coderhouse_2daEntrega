import PetsRepository from '../repositories/pets.repository.js'
import {createHash} from '../configs/bcrypt.config.js'
import generatePetFaker from '../utils/petsFaker.js'


class PetsService {

    constructor(){
         this.petRepository = new PetsRepository()
    }
    
    createPets = async (body) => {
        const {name, type, age_months, age_years} = body

        const newPet = {
            name,
            type,
            age_months,
            age_years
        }

        const pet = await this.petRepository.createPetInDB(newPet)
        return pet
    }

    findAllPets = async () => {
        const pets = await this.petRepository.findAllPetsInDB()
        return pets  
    }

    findPet = async (id) => {
        const pet = await this.petRepository.findPetInDB({_id:id})
        return pet
    }
    
    updatePet = async (id, body) => {
        const {name, type, age_months, age_years} = body

        const updatePet = {}
        if( name !== undefined) updatePet.name = name
        if( type !== undefined) updatePet.type = type
        if( age_months !== undefined ) updatePet.age_months = age_months
        if( age_years !== undefined) updatePet.age_years= age_years
        
        const pet = await this.petRepository.updatePetInDB({_id:id}, updatePet)
        return pet
    }

    deletePet = async (id) => {
        const pet = await this.petRepository.deletePetInDB({_id:id})
        return pet
    }
}



export default PetsService