import jwt from 'jsonwebtoken'
import Usuarios from '../Modules/ModeloUsuarios.js'

const verificarAutenticacion = async (req, res, next) => {

    if (!req.headers.authorization) return res.status(404).json({ msg: "Lo sentimos, debes proprocionar un token" })
    const { authorization } = req.headers
    try {
        const { id, rol } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
        if (rol === "Usuario") {
            req.UsuarioBDD = await Usuarios.findById(id).lean().select("-password")
            next()
        }else {
            const e = new Error("No tienes permisos para acceder a esta ruta")
            return res.status(404).json({ msg: e.message })
        }

    } catch (error) {
        const e = new Error("Formato del token no válido")
        return res.status(404).json({ msg: e.message })
    }
}

export default verificarAutenticacion