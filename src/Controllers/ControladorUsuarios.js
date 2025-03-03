import ModeloUsuarios from "../Modules/ModeloUsuarios.js";

const registro = async (req,res) => {
    const {email, password} = req.body

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debe llenar todos los campos."})
    
    const verificacionBDD = await ModeloUsuarios.findOne({email})
    if(verificacionBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado."})
    
    const nuevoUsuario = new ModeloUsuarios(req.body)
    nuevoUsuario.password = await nuevoUsuario.EncriptarPassword(password)

    await nuevoUsuario.save()

    res.status(200).json({msg:"Se a creado un usuario."})
}

const login = async (req,res) => {
    const {email, password} = req.body

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const verificacionBDD = await ModeloUsuarios.findOne({email})
    if(verificacionBDD?.confirmEmail == false) return res.status(400).json({msg:"Lo sentimos, debe verificar su cuenta"})
    if(!verificacionBDD) return res.status(403).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})

    const verificarPassword = await verificacionBDD.CompararPassword(password)
    if (!verificarPassword) return res.status(404).json({ msg: "Lo sentimos, la contraseña no es correcta" })

    res.status(200).json({
        _id: verificacionBDD._id,
        rol:'Usuarios'
    })
}

export{
    registro,
    login
}