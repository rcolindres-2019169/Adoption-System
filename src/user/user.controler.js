'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const register = async (req, res) => {
    try {
        //Capturar la informacion del formulario
        let data = req.body
        //encriptar la constraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //guardar la informacion en la DB
        let user = new User(data)
        await user.save()//Guardar en la DB
        //Responder al usuario
        return res.send({ message: `Regsistered sucessfully,can be logged with email username ${user.username}` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error registering user', err: error.errors })
    }
}

export const login = async (req, res) => {
    try {
        //Capturar los datos(body)
        let { username, password } = req.body
        //validar que el usuario existe
        let user = await User.findOne({ username })//buscar un solo registro   EN DB username: 'pbermudez'
        //Verificar que la contraseña coincide
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Responde al usuario
            return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }
}


export const update = async (req, res) => {//datos generales (no password)
    try {
        //Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener los datos a actulizar
        let data = req.body
        //Validar si data trae datos
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        //Validar si tiene permisos (tokenizacion)
        //Actualizar 

        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,  //los datos que se van a  actualizar
            { new: true }   //Objeto de la DB ya actualizado
            //ObjectsId  <- hexadecimales (hora de sistema, version de Mongo, llave privada...)
        )
        //Validar la actualizacion
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        //Respondo al usuario
        return res.send({ message: 'Updated user', updatedUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is alredy taken` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteUser = async (req,res)=>{
    try{
        //Obtener id
        let { id } = req.params
        //Validar si esta logeado y es el mismo
        //eliminar (deleteOne (solo elimina, no devuelve el documento) / findOneAndDelete(Me devuelve el documento eliminado))
        let deletedUser = await User.findOneAndDelete({_id: id})
        //Verificar que es elimino
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        //Responder
        return res.send({message: `Account with username ${deletedUser.username} deleted sucessfully`})//status 200
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}


