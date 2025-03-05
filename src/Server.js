import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import routerUsuario from './Routers/RouterUsuarios.js'
import routerEstudiante from './Routers/RouterEstudiantes.js'
import routerMaterias from './Routers/RouterMaterias.js'
import routerMatriculas from './Routers/RoutersMatriculas.js'


const app = express()
dotenv.config()

app.set('port',process.env.port || 3001)
const corsOptions = {
    origin: ['http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'method'],
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(morgan('dev'))

app.use('/api',routerUsuario)
app.use('/api',routerEstudiante)
app.use('/api',routerMaterias)
app.use('/api',routerMatriculas)

app.get('/',(req,res)=>{ res.send("Servidor en Linea") })

app.use((req,res) => res.status(400).send("Endpoint no encontrado"))

export default app