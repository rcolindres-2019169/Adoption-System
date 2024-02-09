// Configuracion para servidor HTTP (Levantar servidor)
//ESModules
'use strict'

//Importaciones
import express from 'express'
import morgan from "morgan"
import helmet from "helmet"
import cors from 'cors'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'


//Configuraciones
const app = express()
config();
const port = process.env.PORT || 3056

//Configuracion del servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //Aceptar o denegar solicitudes de diferentes origenes (Local, remoto) / politicas de acceso
app.use(helmet()) // Aplica capa de seguridad basica al servidor
app.use(morgan('dev'))//Logs de solicitudes al servidor HTTP

//Rutas
app.use(userRoutes)
app.use(animalRoutes)

//Levanatar el servidor
export const initServer=()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}