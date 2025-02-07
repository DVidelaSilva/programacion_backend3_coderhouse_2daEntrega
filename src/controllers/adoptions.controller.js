import AdoptionsService from "../services/adoptions.service.js"

class AdoptionsController {

    constructor() {
        this.adoptionsService = new AdoptionsService()
    }


    postAdoption = async (req, res) => {
        try {

            const {uid, pid} = req.params
            
            const user = await this.adoptionsService.findAdoptionUser(uid)
            if(!user) {
                return res.status(404).send({status:"error",error:"Usuario no encontrado"})
            }

            const pet = await this.adoptionsService.findAdoptionPet(pid)
            if(!pet) {
                return res.status(404).send({status:"error",error:"Mascota no encontrada"})
            }

            console.log(pet.adopted);
            if(pet.adopted) {
                return res.status(404).send({status:"error",error:"Mascota ya se encuentra adoptada"})
            }

            user.pets.push(pet._id)

            await this.adoptionsService.updateUserAdopted(user._id, {pets: user.pets})
            await this.adoptionsService.updatePetAdopted(pet._id, {adopted: true, owner:user._id})
            
            await this.adoptionsService.createAdoption({owner: user._id, pet: pet._id})
            
            return res.status(201).send({status:"success",message:"Pet adopted"})

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al crear Adopcion' })
        }
    }

    getAdoptions = async (req, res) => {
        try {
            const adoptions = await this.adoptionsService.findAdoptions()
            if(adoptions.length == 0) {
                return res.status(206).send({status:"Info",error:"No Existen Adopciones registradas"})
            } else {
                return res.status(200).send({status: 'success', message: 'Adopciones Encontradas exitosamente', data: adoptions})
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al devolver Adopciones' })
        }
    }


    getAdoption = async (req, res) => {
        try {
            const adoptionId = req.params.aid
            const adoption = await this.adoptionsService.findAdoption(adoptionId)
            if(!adoption) {
                return res.status(404).send({status:"error",error:"Adopcion no encontrada"})
            } else {
                return res.status(200).send({status: 'success', message: 'Adopcion Encontrada exitosamente', data: adoption})
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al devolver Adopcion' })
        }
    }


    updateAdoption = async (req, res) => {
        try {
            const {owner_id, pet_id} = req.body
            const adoptedId = req.params.aid

            const adoption = await this.adoptionsService.findAdoption(adoptedId)
            if(!adoption) {
                return res.status(404).send({status:"error",error:"Adopcion no encontrada"})
            }

            const owner = await this.adoptionsService.findAdoptionUser(owner_id)
            if(!owner) {
                return res.status(404).send({status:"error",error:"Dueño no encontrado"})
            }

            const pet = await this.adoptionsService.findAdoptionPet(pet_id)
            if(!pet) {
                return res.status(404).send({status:"error",error:"Mascota no encontrada"})
            }
            if(pet.adopted) {
                return res.status(404).send({status:"error",error:"Mascota ya se encuentra adoptada"})
            }
            

            const adoptionsUpdate = await this.adoptionsService.updateAdopted(adoptedId, req.body)

            const adoptionNewUpdate = await this.adoptionsService.findAdoption(adoptedId)

            return res.status(201).send({status: 'success', message: 'Adopcion actualizada exitosamente', data: adoptionNewUpdate})
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar adopcion' })
        }
    }

    deleteAdoption = async (req, res) => {
        try {
            const adoptionId = req.params.aid
            const adoptionIdExist = await this.adoptionsService.findAdoption(adoptionId)
            if(!adoptionIdExist) {
                return res.status(404).send({status:"error",error:"Adopcion no encontrada"})
            } else {
                const adopcion = await this.adoptionsService.deleteAdoption(adoptionId)
                return res.status(200).send({status: 'success', message: 'Adopcion eliminada exitosamente', data: adopcion})
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar adopcion' })
        }
    }

}


export default AdoptionsController