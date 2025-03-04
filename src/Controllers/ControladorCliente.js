import mongoose from "mongoose";
import ModeloClientes from "../Modules/ModeloClientes.js";

const creacionClientes = async (req,res) => {
    const {cedula, email} = req.body

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificacionCedulaBDD = await ModeloClientes.findOne({cedula})
    if (verificacionCedulaBDD) return res.status(401).json({msg:"Lo sentimos, la cedula ya se encuentra registrada"})
    const verificacionEmailBDD = await ModeloClientes.findOne({email})
    if (verificacionEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    
    const nuevoCliente = new ModeloClientes(req.body)
    await nuevoCliente.save()

    res.status(200).json({msg:"Se creo exitosamente el cliente"})
}
const verCliente = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:'Lo sentimos, deve ser un id válido'})
    const ClienteBDD = await ModeloClientes.findById(id).select("-password")
    if(!ClienteBDD) return res.status(404).json({msg:`Lo sentimos, no existe el cliente ${id}`})
    res.status(200).json({msg:ClienteBDD})
}
const actualizarCliente = async (req,res) => {
    const { id } = req.params
    const { cedula, email, nombre, apellido, cuidad, direccion, telefono, fechaNacimiento } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:'Lo sentimos, debe ser un id válido'})

    const clienteExistente = await ModeloClientes.findById(id)
    if (!clienteExistente) return res.status(404).json({msg:`Lo sentimos, no existe el cliente con id ${id}`})

    clienteExistente.cedula = cedula || clienteExistente.cedula
    clienteExistente.email = email || clienteExistente.email
    clienteExistente.nombre = nombre || clienteExistente.nombre
    clienteExistente.apellido = apellido || clienteExistente.apellido
    clienteExistente.cuidad = cuidad || clienteExistente.cuidad
    clienteExistente.direccion = direccion || clienteExistente.direccion
    clienteExistente.telefono = telefono || clienteExistente.telefono
    clienteExistente.fechaNacimiento = fechaNacimiento || clienteExistente.fechaNacimiento

    await clienteExistente.save()

    res.status(200).json({msg:"Se actualizo exitosamente el cliente"})
}
const eliminarCliente = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:'Lo sentimos, debe ser un id válido'})

    const clienteEliminado = await ModeloClientes.findByIdAndDelete(id)
    if (!clienteEliminado) return res.status(404).json({msg:`Lo sentimos, no existe el cliente con id ${id}`})

    res.status(200).json({msg:"Se elimino exitosamente el cliente"})
}

export {
    creacionClientes,
    verCliente,
    actualizarCliente,
    eliminarCliente
}