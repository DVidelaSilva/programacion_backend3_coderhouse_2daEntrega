import UsersRepository from '../repositories/users.repository.js'
import {createHash} from '../configs/bcrypt.config.js'
import generateUser from '../utils/usersFaker.js'

class UsersService {

    constructor(){
         this.userRepository = new UsersRepository()
    }
    

    createUsers = async (body) => {
        const {first_name, last_name, email, password} = body
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password)
        }
        const user = await this.userRepository.createUserInDB(newUser)
        return user
    }

    findAllUsers = async () => {
        const users = await this.userRepository.findAllUsersInDB()
        return users  
    }

    findUser = async (id) => {
        const user = await this.userRepository.findUserInDB({_id:id})
        return user
    }

    findExistUser = async (email) => {
        const user = await this.userRepository.findUserInDB({email: email})
        return user
    }

    updateUser = async (id, body) => {
        const {first_name, last_name, email, password} = body

        const updateUser = {}
        if( first_name !== undefined) updateUser.first_name = first_name
        if( last_name !== undefined) updateUser.last_name = last_name
        if( email !== undefined ) updateUser.email = email
        if( password !== undefined) {
            updateUser.password = await createHash(password)
        }

        const user = await this.userRepository.updateUserInDB({_id:id}, updateUser)
        return user

    }

    deleteUser = async (id) => {
        const user = await this.userRepository.deleteUserInDB({_id:id})
        return user
    }

}



export default UsersService