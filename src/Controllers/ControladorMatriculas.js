import mongoose from "mongoose";
import ModeloMatriculas from "../Modules/ModeloMatriculas.js";
import ModeloMaterias from "../Modules/ModeloMaterias.js";
import ModeloEstudiantes from "../Modules/ModeloEstudiantes.js";


const crearMatricula = async (req, res) => {
    try {
        if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Debe seleccionar todos los campos"})
        const { codigo } = req.body;
        const verificacionCodigoBDD = await ModeloMatriculas.findOne({codigo})
        if (verificacionCodigoBDD) return res.status(400).json({msg:"Lo sentimos, el codigo ya se encuentra registrado"})
        if (!mongoose.Types.ObjectId.isValid(req.body.materia)) return res.status(400).json({msg: "ID de materia no válido"})
        if (!mongoose.Types.ObjectId.isValid(req.body.estudiante)) return res.status(400).json({msg: "ID de estudiante no válido"})

        const materia = await ModeloMaterias.findById(req.body.materia)
        if (!materia) return res.status(404).json({msg: "Materia no encontrada"})

        const estudiante = await ModeloEstudiantes.findById(req.body.estudiante)
        if (!estudiante) return res.status(404).json({msg: "Estudiante no encontrada"})

        const matricula = new ModeloMatriculas(req.body)
        matricula.materia = materia._id;
        matricula.estudiante = estudiante._id;
        await matricula.save()

        res.status(200).json({msg: "Matricula creada con exito"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error al crear la matricula" })
    }
}
const obtenerMatriculas = async (req, res) => {
    try {
        const matriculas = await ModeloMatriculas.find()
            .populate('materia', 'nombre')
            .populate('estudiante', 'nombre')
        res.status(200).json(matriculas)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error al obtener las matrículas" })
    }
}
const actualizarMatricula = async (req, res) => {
    const { id } = req.params
    const { codigo, descripcion, creditos } = req.body

    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Debe seleccionar todos los campos"})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: 'ID de matrícula no válido' })

    try {
        const matriculaActualizada = await ModeloMatriculas.findByIdAndUpdate(id, req.body, { new: true })
        if (!matriculaActualizada) return res.status(404).json({ msg: "Matrícula no encontrada" })
        res.status(200).json({ msg: "Matrícula actualizada exitosamente" })
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar la matrícula", error })
    }
}
const eliminarMatricula = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: 'ID de matrícula no válido' })
    try {
        const matriculaEliminada = await ModeloMatriculas.findByIdAndDelete(id)
        if (!matriculaEliminada) return res.status(404).json({ msg: "Matrícula no encontrada" })
        res.status(200).json({ msg: "Matrícula eliminada exitosamente" })
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar la matrícula", error })
    }
}

export {
    crearMatricula,
    obtenerMatriculas,
    actualizarMatricula,
    eliminarMatricula
}
