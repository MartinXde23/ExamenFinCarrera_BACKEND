import express from 'express';
import { crearMatricula, obtenerMatriculas, actualizarMatricula, eliminarMatricula } from '../Controllers/ControladorMatriculas.js';
import verificarAutenticacion from '../Middlewares/autentication.js';
import { valiActualizarMatricula, validacionCrearMatricula } from '../Validation/ValidacionMatriculas.js';

const routerMatriculas = express.Router();


routerMatriculas.post('/crearMatricula/',verificarAutenticacion,validacionCrearMatricula(), crearMatricula);
routerMatriculas.get('/verMatriculas',verificarAutenticacion, obtenerMatriculas);
routerMatriculas.put('/actualizarMatricula/:id',verificarAutenticacion,valiActualizarMatricula(), actualizarMatricula);
routerMatriculas.delete('/eliminarMatricula/:id',verificarAutenticacion, eliminarMatricula);

export default routerMatriculas
