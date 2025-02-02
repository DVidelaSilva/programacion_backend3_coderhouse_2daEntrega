import UsersService from "../services/users.service.js"

class UsersController {

    constructor() {
        this.usersService = new UsersService()
    }


    postUsers = async (req, res) => {
        try {  
            const {first_name, last_name, email, password} = req.body
            const userEmail = req.body.email
            const user = await this.usersService.findExistUser(userEmail)
            if(user) {
                return res.status(400).send({status:"error",error:"Usuario ya se encuentra registrado"})
            } else {
                const users = await this.usersService.createUsers(req.body)
                return res.status(201).send({status: 'success', message: 'Usuario creado exitosamente', data: users})
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear usuario' })
        }
    }

    getUsers = async (req, res) => {
        try {
            const users = await this.usersService.findAllUsers()
            if(!users) {
                return res.status(200).send({status:"Info",error:"No Existen Usuarios registrados"})
            } else {
                return res.status(200).send({status: 'success', message: 'Usuarios Encontrados exitosamente', data: users})
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al devolver usuarios' })
        }
    }


    getUser = async (req, res) => {
        try {
            const userId = req.params.id
            const user = await this.usersService.findUser(userId)
            if(!user) {
                return res.status(404).send({status:"error",error:"Usuario no encontrado"})
            } else {
                return res.status(200).send({status: 'success', message: 'Usuario Encontrado exitosamente', data: user})
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al devolver usuarios' })
        }
    }


    updateUsers = async (req, res) => {
        try {
            const {first_name, last_name, email, password} = req.body
            const userId = req.params.id
            console.log(userId);
            const userEmail = req.body.email
            console.log(userEmail);
            
            const userIdExist = await this.usersService.findUser(userId)
            console.log(userIdExist);
            if(!userIdExist) {
                    return res.status(404).send({status:"error",error:"Usuario no encontrado"})
            } 

            const userEmailExist = await this.usersService.findExistUser(userEmail)
            console.log(userEmailExist);
            if(userEmailExist !== null) {
                return res.status(400).send({status:"error",error:"Usuario con este email ya registrado"})
            } 

            const user = await this.usersService.updateUser(userId, req.body)
            console.log(user);
            const userNewUpdate = await this.usersService.findUser(userId)
            return res.status(201).send({status: 'success', message: 'Usuario actualizado exitosamente', data: userNewUpdate})
            
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar usuario' })
        }
    }


    deleteUser = async (req, res) => {
        try {
            const userId = req.params.id
            const userIdExist = await this.usersService.findUser(userId)
            if(!userIdExist) {
                return res.status(404).send({status:"error",error:"Usuario no encontrado"})
            } else {
                const user = await this.usersService.deleteUser(userId)
                return res.status(200).send({status: 'success', message: 'Usuario eliminado exitosamente', data: user})
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar usuario' })
        }
    }
}


export default UsersController