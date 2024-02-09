'use strict'

import animalModel from './animal.model.js'
import Animal from './animal.model.js'

export const save = async (req,res) =>{
    try{
        let data = req.body

        let animal = new Animal(data)
        await animal.save()
        return res.send({message:`Registered sucessfully, can be register ${animal.name}`})
    }catch(err){
        console.error(err)
    }
}