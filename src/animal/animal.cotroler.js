'use strict'

import Animal from './animal.model.js'
import { checkUpdate } from '../utils/validator.js'

export const save = async (req,res) =>{
    try{
        let data = req.body
        console.log(data)
        let animal = new Animal(data)
        await animal.save()
        return res.send({message:`Registered sucessfully, can be register ${animal.name}`})
    }catch(error){
        console.error(error)
        return res.status(500).send({message:'Error registering user', err:error.errors})
    }
}


export const updatePet = async(req,res)=>{
    try{
        let{id} = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update ) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})

        let updatedAnimal = await Animal.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )

        if(!updatedAnimal) return res.status(401).send({ message: 'Animal not found and not updated' })
        return res.send({ message: 'Updated animal', updatedAnimal })
    }catch(err){
        console.error(err)
        if(err.keyValue.namePet) return res.status(400).send({ message: `Pet ${err.keyValue.namePet} is alredy taken` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}


export const deleteAnimal = async (req,res)=>{
    try{
        let { id } = req.params
        let deletedAnimal = await Animal.findOneAndDelete({_id: id})
        if(!deletedAnimal) return res.status(404).send({message: 'Animal not found and not deleted'})
        return res.send({message: `Animal with name ${deletedAnimal.namePet} deleted sucessfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting animal'})
    }
}


export const listAnimal = async (req,res)=>{
    
}