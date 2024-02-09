import mongoose from "mongoose";

const animalSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    keeper:{
        type: Schema.ObjectId, ref:"user",
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

export default mongoose.model('animal', animalSchema    )