
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

    findPetInDB = async (params) => {
        const pet = await petModel.findOne(params)
        return pet
    }

    updatePetInDB = async (params, body) => {
        const pet = await petModel.findByIdAndUpdate(params, body)
        return pet
    }

    deletePetInDB = async (params) => {
        const pet = await petModel.deleteOne(params)
        return pet
    }
}


export default PetsRepository