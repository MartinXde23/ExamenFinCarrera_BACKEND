import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UsuariosSchema = new Schema({
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
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
})

UsuariosSchema.methods.EncriptarPassword = async function(password){
    const nivelSal = await bcrypt.genSalt(10)
    const ContraEncriptada = await bcrypt.hash(password, nivelSal)
    return ContraEncriptada
}

UsuariosSchema.methods.CompararPassword = async function (password){
    const comparacion = bcrypt.compare(password, this.password)
    return comparacion
}

//Creacion de token
UsuariosSchema.methods.GeneradorToken = function(){
    const tokenSesion=this.token = Math.random().toString(36).slice(2)
    return tokenSesion
}

export default model('Usuario', UsuariosSchema)