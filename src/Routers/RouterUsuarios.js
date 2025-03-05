import { Router } from "express";
import { login, Perfil, registro } from "../Controllers/ControladorUsuarios.js";


const routerUsuario = Router()

routerUsuario.post('/registro',registro)
routerUsuario.post('/login', login)
routerUsuario.get('/perfilUsuario',Perfil)
export default routerUsuario