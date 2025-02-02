import { Schema, model } from "mongoose";


const petsCollection = 'pets'


const petSchema = new Schema({

    name: {
        type: String,
        require: true
    },

    type: {
        type: String,
        require: true
    },

    age_months: {
        type: Number,
        require: true,
    },

    age_years: {
        type: Number,
        require: true,
    },
    
    owner: {
        type: Boolean,
        default: false
    },

    adopted: {
        type: Boolean,
        default: false
    },

})


const petModel = model(petsCollection, petSchema)

export default petModel