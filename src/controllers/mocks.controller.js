import MocksService from "../services/mocks.service.js"


class MocksController {

    constructor() {
        this.mocksService = new MocksService()
    }

    
    
    getUsersFaker = async (req, res) => {
        try {
            const users = await this.mocksService.createUserFaker()
            return res.status(200).send({status: 'success', message: 'Usuarios creados con Fake exitosamente', data: users})

        } catch (error) {
            return res.status(500).json({ message: 'Error al devolver usuarios' })
        }
    }



    getPetsFaker = async (req, res) => {
        try {
            const pets = await this.mocksService.createPetFaker()
            return res.status(200).send({status: 'success', message: 'Pets creados con Fake exitosamente', data: pets})

        } catch (error) {
            return res.status(500).json({ message: 'Error al devolver pets' })
        }
    }



    postGenerateData = async (req, res) => {
        try {
            const {users, pets} = req.body

            const quantity = await this.mocksService.generateData(req.body)

            return res.status(201).send({status: 'success', message: 'Data creada exitosamente', data: quantity})

        } catch (error) {
            return res.status(500).json({ message: 'Error al crear data' })
        }
    }

    
}


export default MocksController