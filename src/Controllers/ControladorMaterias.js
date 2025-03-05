import mongoose from "mongoose";
import ModeloMaterias from "../Modules/ModeloMaterias.js";

const creacionMaterias = async (req,res) => {

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const nuevaMateria = new ModeloMaterias(req.body)
    await nuevaMateria.save()

    res.status(200).json({msg:"Se creo exitosamente la materia"})
}

const verMateria = async (req,res) => {
    try {
        const materias = await ModeloMaterias.find()
        res.status(200).json(materias)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error al obtener las materias" })
    }
}
const actualizarMateria = async (req,res) => {
    const { id } = req.params
    const { nombre, codigo, descripcion, creditos } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:'Lo sentimos, debe ser un id válido'})

    const materiaExistente = await ModeloMaterias.findById(id)
    if (!materiaExistente) return res.status(404).json({msg:`Lo sentimos, no existe la materia con id ${id}`})

    materiaExistente.nombre = nombre || materiaExistente.nombre
    materiaExistente.codigo = codigo || materiaExistente.codigo
    materiaExistente.descripcion = descripcion || materiaExistente.descripcion
    materiaExistente.creditos = creditos || materiaExistente.creditos

    await materiaExistente.save()

    res.status(200).json({msg:"Se actualizo exitosamente la materia"})
}
const eliminarMateria = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:'Lo sentimos, debe ser un id válido'})

    const materiaEliminada = await ModeloMaterias.findByIdAndDelete(id)
    if (!materiaEliminada) return res.status(404).json({msg:`Lo sentimos, no existe la materia con id ${id}`})

    res.status(200).json({msg:"Se elimino exitosamente la materia"})
}

export {
    creacionMaterias,
    verMateria,
    actualizarMateria,
    eliminarMateria
}