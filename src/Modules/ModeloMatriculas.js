import { Schema, model, mongoose } from "mongoose";

const MatriculasSchema = new Schema({
    codigo:{
        type:String,
        required:true,
        trim:true
    },
    descripcion:{
        type:String,
        required:true,
        trim:true
    },
    creditos:{
        type:String,
        required:true,
        trim:true
    },
    materia:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Materia",
        required:true
    },
    estudiante:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Estudiante",
        required:true
    }
})

export default model('Matricula', MatriculasSchema)