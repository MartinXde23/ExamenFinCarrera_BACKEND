import { Router } from "express";
import { actualizarMateria, creacionMaterias, eliminarMateria, verMateria } from "../Controllers/ControladorMaterias.js";
import verificarAutenticacion from "../Middlewares/autentication.js";
import { valiActualizarMateria, validacionCrearMateria } from "../Validation/ValidacionMaterias.js";

const routerMaterias = Router()

routerMaterias.post('/crearMateria',verificarAutenticacion,validacionCrearMateria(), creacionMaterias)
routerMaterias.get('/verMaterias', verificarAutenticacion, verMateria)
routerMaterias.put('/actualizarMateria',verificarAutenticacion,valiActualizarMateria(), actualizarMateria)
routerMaterias.delete('/eliminarMateria', verificarAutenticacion, eliminarMateria)

export default routerMaterias