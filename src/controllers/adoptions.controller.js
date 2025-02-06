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
            if(pet.adopted) {
                return res.status(404).send({status:"error",error:"Mascota ya se encuentra adoptada"})
            }

            user.pets.push(pet._id)

            console.log(user._id);
            console.log(user.pets);

            await this.adoptionsService.updateUserAdopted(user._id, {pets: user.pets})
            await this.adoptionsService.updatePetAdopted(pet._id, {adopted: true, owner:user._id})
            
            await this.adoptionsService.createAdoption({owner: user._id, pet: pet._id})
            
            return res.status(201).send({status:"success",message:"Pet adopted"})

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al crear Adopcion' })
        }
    }

    // getPets = async (req, res) => {
    //     try {
    //         const pets = await this.petsService.findAllPets()
    //         if(pets.length == 0) {
    //             return res.status(206).send({status:"Info",error:"No Existen Mascotas registradas"})
    //         } else {
    //             return res.status(200).send({status: 'success', message: 'Mascotas Encontradas exitosamente', data: pets})
    //         }
    //     } catch (error) {
    //         return res.status(500).json({ message: 'Error al devolver Mascotas' })
    //     }
    // }


    // getPet = async (req, res) => {
    //     try {
    //         const petId = req.params.id
    //         const pet = await this.petsService.findPet(petId)
    //         if(!pet) {
    //             return res.status(404).send({status:"error",error:"Mascota no encontrada"})
    //         } else {
    //             return res.status(200).send({status: 'success', message: 'Mascota Encontrada exitosamente', data: pet})
    //         }
    //     } catch (error) {
    //         return res.status(500).json({ message: 'Error al devolver Mascota' })
    //     }
    // }


    // updatePet = async (req, res) => {
    //     try {
    //         const {name, type, age_months, age_years} = req.body
    //         const petId = req.params.id
            
    //         const petIdExist = await this.petsService.findPet(petId)
    //         if(!petIdExist) {
    //                 return res.status(404).send({status:"error",error:"Mascota no encontrada"})
    //         } 

    //         const pet = await this.petsService.updatePet(petId, req.body)
    //         const petNewUpdate = await this.petsService.findPet(petId)
    //         return res.status(201).send({status: 'success', message: 'Mascota actualizada exitosamente', data: petNewUpdate})
    //     } catch (error) {
    //         return res.status(500).json({ message: 'Error al actualizar mascota' })
    //     }
    // }

    // deletePet = async (req, res) => {
    //     try {
    //         const petId = req.params.id
    //         const petIdExist = await this.petsService.findPet(petId)
    //         if(!petIdExist) {
    //             return res.status(404).send({status:"error",error:"Mascota no encontrada"})
    //         } else {
    //             const pet = await this.petsService.deletePet(petId)
    //             return res.status(200).send({status: 'success', message: 'Mascota eliminada exitosamente', data: pet})
    //         }
    //     } catch (error) {
    //         return res.status(500).json({ message: 'Error al eliminar mascota' })
    //     }
    // }

}


export default AdoptionsController