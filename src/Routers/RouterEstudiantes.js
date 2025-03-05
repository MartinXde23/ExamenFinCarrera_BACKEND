import { Router } from "express";
import {creacionEstudiantes, verEstudiantes, actualizarEstudiantes, eliminarEstudiantes } from "../Controllers/ControladorEstudiante.js";
import verificarAutenticacion from "../Middlewares/autentication.js";
import { valiActualizarEstudiante, validacionCrearEstudiante } from "../Validation/ValidacionEstudiantes.js";

const routerEstudiante = Router()

routerEstudiante.post('/crearEstudiante',verificarAutenticacion,validacionCrearEstudiante(),creacionEstudiantes)
routerEstudiante.get('/verEstudiantes',verificarAutenticacion,verEstudiantes)
routerEstudiante.put('/actualizarEstudiante/:id',verificarAutenticacion,valiActualizarEstudiante(), actualizarEstudiantes)
routerEstudiante.delete('/eliminarEstudiante/:id',verificarAutenticacion, eliminarEstudiantes)

export default routerEstudiante