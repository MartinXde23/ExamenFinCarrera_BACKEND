import { Schema, model } from "mongoose";

const MateriasSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
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
    }
})

export default model('Materia', MateriasSchema);