
import adoptionModel from '../models/adoption.model.js'

class AdoptionsRepository {


    constructor() {
       this.adoptionModel = new adoptionModel()
    }
    


    createAdoptionInDB = async (data) => {
        const adoption = await adoptionModel.create(data)
        return adoption
    }

    findAllAdoptionInDB = async () => {
        const adoption = await adoptionModel.find()
        return adoption
    }

    findAdoptionInDB = async (params) => {
        const adoption = await adoptionModel.findOne(params)
        return adoption
    }

    updateAdoptionInDB = async (params, body) => {
        const adoption = await adoptionModel.findByIdAndUpdate(params, body)
        return adoption
    }

    deleteAdoptionInDB = async (params) => {
        const adoption = await adoptionModel.deleteOne(params)
        return adoption
    }
}


export default AdoptionsRepository