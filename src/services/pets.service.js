import PetsRepository from '../repositories/pets.repository.js'
import createHash from '../configs/bcrypt.config.js'
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



}



export default PetsService