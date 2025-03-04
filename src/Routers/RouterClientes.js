import { Router } from "express";
import { creacionClientes, verCliente, actualizarCliente, eliminarCliente } from "../Controllers/ControladorCliente.js";

const routerCliente = Router()

routerCliente.post('/crearCliente',creacionClientes)
routerCliente.get('/verCliente/:id',verCliente)
routerCliente.put('/actualizarCliente/:id', actualizarCliente)
routerCliente.delete('/eliminarCliente/:id', eliminarCliente)

export default routerCliente