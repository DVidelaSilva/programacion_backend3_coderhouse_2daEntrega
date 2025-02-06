
import userModel from '../models/users.model.js'

class UsersRepository {


    constructor() {
       this.userModel = new userModel()
    }
    

    createUserInDB = async (body) => {
        const user = await userModel.create(body)
        return user
    }

    findAllUsersInDB = async () => {
        const users = await userModel.find()
        return users
    }

    findUserInDB = async (params) => {
        const user = await userModel.findOne(params)
        return user
    }

    updateUserInDB = async (params, body) => {
        const user = await userModel.findByIdAndUpdate(params, body)
        return user
    }

    deleteUserInDB = async (params) => {
        const user = await userModel.deleteOne(params)
        return user
    }

    findUserByEmailInDB = async (email) => {
        const user = await userModel.findOne(email)
        return user
    }
}


export default UsersRepository