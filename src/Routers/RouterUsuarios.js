import { Router } from "express";
import { login, registro } from "../Controllers/ControladorUsuarios.js";


const routerUsuario = Router()

routerUsuario.post('/registro',registro)
routerUsuario.post('/login',login)

export default routerUsuario