import { Schema, model } from "mongoose";


const usersCollection = 'users'


const userSchema = new Schema({

    first_name: {
        type: String,
        require: true
    },

    last_name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },

    pets: {
        type: [],
        default: []
    },

})


const userModel = model(usersCollection, userSchema)

export default userModel