import express from 'express'
import { deleteAnimal, save, updatePet } from './animal.cotroler.js'

const api= express.Router()

api.post('/save', save)
api.put('/updatePet/:id', updatePet)
api.delete('/deleteAnimal/:id', deleteAnimal)

export default api