import { Schema, model } from "mongoose"

const ClienteSchema = new Schema({
    cedula:{
        type:String,
        required:true,
        trim:true
    },
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    apellido:{
        type:String,
        required:true,
        trim:true
    },
    cuidad:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    direccion:{
        type:String,
        required:true,
        trim:true
    },
    telefono:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        default:null
    },
    fechaNacimiento:{
        type:Date,
        required:true
    }
})

export default model('Cliente',ClienteSchema)