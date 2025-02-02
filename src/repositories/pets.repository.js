
import petModel from '../models/pets.model.js'

class PetsRepository {


    constructor() {
       this.petModel = new petModel()
    }
    


    createPetInDB = async (data) => {
        const pet = await petModel.create(data)
        return pet
    }


    findAllPetsInDB = async () => {
        const pets = await petModel.find()
        return pets
    }

    deletePets = async () => {
        await petModel.deleteMany()
    }




}


export default PetsRepository