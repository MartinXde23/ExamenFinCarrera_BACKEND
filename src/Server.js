import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
dotenv.config()

app.set('port',process.env.port || 3001)
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.get('/',(req,res)=>{ res.send("Servidor en Linea") })

app.use((req,res) => res.status(400).send("Endpoint no encontrado"))

export default app