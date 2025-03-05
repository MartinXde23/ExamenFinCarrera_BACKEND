import mongoose from "mongoose";
import ModeloEstudiantes from "../Modules/ModeloEstudiantes.js";

const creacionEstudiantes = async (req,res) => {
    const {cedula, email} = req.body

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificacionCedulaBDD = await ModeloEstudiantes.findOne({cedula})
    if (verificacionCedulaBDD) return res.status(401).json({msg:"Lo sentimos, la cedula ya se encuentra registrada"})
    const verificacionEmailBDD = await ModeloEstudiantes.findOne({email})
    if (verificacionEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const verificacionTelefonoBDD = await ModeloEstudiantes.findOne({telefono: req.body.telefono});
    if (verificacionTelefonoBDD) return res.status(400).json({msg:"Lo sentimos, el teléfono ya se encuentra registrado"});
    
    const nuevoEstudiante = new ModeloEstudiantes(req.body)
    await nuevoEstudiante.save()

    res.status(200).json({msg:"Se creo exitosamente el estudiante"})
}
const verEstudiantes = async (req,res) => {
    try {
        const estudiantes = await ModeloEstudiantes.find()
        res.status(200).json(estudiantes)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error al obtener los estudiantes" })
    }
}
const actualizarEstudiantes = async (req,res) => {
    const { id } = req.params
    const { cedula, email, nombre, apellido, cuidad, direccion, telefono, fechaNacimiento } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:'Lo sentimos, debe ser un id válido'})

    const estudianteExistente = await ModeloEstudiantes.findById(id)
    if (!estudianteExistente) return res.status(404).json({msg:`Lo sentimos, no existe el estudiante con id ${id}`})

    estudianteExistente.cedula = cedula || estudianteExistente.cedula
    estudianteExistente.email = email || estudianteExistente.email
    estudianteExistente.nombre = nombre || estudianteExistente.nombre
    estudianteExistente.apellido = apellido || estudianteExistente.apellido
    estudianteExistente.cuidad = cuidad || estudianteExistente.cuidad
    estudianteExistente.direccion = direccion || estudianteExistente.direccion
    estudianteExistente.telefono = telefono || estudianteExistente.telefono
    estudianteExistente.fechaNacimiento = fechaNacimiento || estudianteExistente.fechaNacimiento

    await estudianteExistente.save()

    res.status(200).json({msg:"Se actualizo exitosamente el estudiante"})
}
const eliminarEstudiantes = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:'Lo sentimos, debe ser un id válido'})

    const estudianteEliminado = await ModeloEstudiantes.findByIdAndDelete(id)
    if (!estudianteEliminado) return res.status(404).json({msg:`Lo sentimos, no existe el cliente con id ${id}`})

    res.status(200).json({msg:"Se elimino exitosamente el estudiante"})
}

export {
    creacionEstudiantes,
    verEstudiantes,
    actualizarEstudiantes,
    eliminarEstudiantes
}