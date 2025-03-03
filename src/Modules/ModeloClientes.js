import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { token } from "morgan";

const ClienteSchema = new Schema({
    cedula:{
        try:Number,
        require:true,
        trim:true
    },
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    cuidad:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        require:true,
        trim:true
    },
    direccion:{
        type:String,
        require:true,
        trim:true
    },
    telefono:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        default:null
    },
    fechaNacimiento:{
        type:Date,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

export default model('Cliente',ClienteSchema)