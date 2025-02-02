import PetsService from "../services/pets.service.js"

class PetsController {

    constructor() {
        this.petsService = new PetsService()
    }


    postPets = async (req, res) => {

        try {
            const {name, type, age_months, age_years} = req.body
            const pets = await this.petsService.createPets(req.body)
            return res.status(201).send({status: 'success', message: 'Pet creado exitosamente', data: pets})

        } catch (error) {
            return res.status(500).json({ message: 'Error al crear pet' })
        }
    }


    getPets = async (req, res) => {
        try {
            const pets = await this.petsService.findAllPets()
            return res.status(200).send({status: 'success', message: 'Pets Encontrados exitosamente', data: pets})

        } catch (error) {
            return res.status(500).json({ message: 'Error al devolver pets' })
        }
    }


}


export default PetsController