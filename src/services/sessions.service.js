import UsersRepository from '../repositories/users.repository.js'
import {createHash, isValidPassword} from '../configs/bcrypt.config.js'
import {generateToken} from '../middlewares/jwt.middlewares.js'

class SessionService {

    constructor(){
         this.userRepository = new UsersRepository()
    }

    findExistUser = async (email) => {
        const user = await this.userRepository.findUserByEmailInDB({email: email})
        return user
    }
    
    registerUser = async (body) => {
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



    loginUser = async(body) => {
        const {email, password} = body
        const userFound = await this.userRepository.findUserByEmailInDB({email: email})
 
        if(!userFound){
            throw new Error(`el usuario email <${email}, no se encuentra registrado`)
        }
        if(!isValidPassword(password, userFound.password)){
            throw new Error('Las credenciales no coinciden')
        }
        const token = generateToken({id: userFound._id, role: userFound.role})

        const role = userFound.role

        return{token, role}
    }


}


export default SessionService