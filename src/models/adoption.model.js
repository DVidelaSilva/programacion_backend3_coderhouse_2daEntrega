import { model, Schema, SchemaType, mongoose}  from "mongoose";

const adoptionCollection = 'adoptions'

const adoptionSchema = new Schema({

    owner : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    pet: {
        type: Schema.Types.ObjectId,
        ref: 'pets'
    }
})

const adoptionModel = model(adoptionCollection, adoptionSchema)

export default adoptionModel