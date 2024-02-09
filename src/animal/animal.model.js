import mongoose from "mongoose";

const animalSchema = mongoose.Schema({
    namePet:{
        type: String,
        required: true
    },
    keeper:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    race:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
})

export default mongoose.model('animal', animalSchema)