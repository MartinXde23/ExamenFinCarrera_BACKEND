import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import routerUsuario from './Routers/RouterUsuarios.js'
import routerCliente from './Routers/RouterClientes.js'


const app = express()
dotenv.config()

app.set('port',process.env.port || 3001)
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api',routerUsuario)
app.use('/api',routerCliente)

app.get('/',(req,res)=>{ res.send("Servidor en Linea") })

app.use((req,res) => res.status(400).send("Endpoint no encontrado"))

export default app