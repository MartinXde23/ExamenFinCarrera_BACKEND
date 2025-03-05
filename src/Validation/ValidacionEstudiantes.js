import { check, validationResult } from "express-validator";

const validacionCrearEstudiante = () => {
    return [
        check('cedula')
        .trim()
        .notEmpty().withMessage('La cedula es obligatoria')
        .isNumeric().withMessage('La cedula debe contener solo numeros')
        .isLength({ min:10, max:13 }).withMessage('La cedula debe tener entre 10 y 13 digitos'),

        check('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras y espacios'),

        check('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El apellido solo puede contener letras y espacios'),

        check('cuidad')
        .trim()
        .notEmpty().withMessage('La cuidad es obligatoria')
        .isLength({ min: 5, max: 100 }).withMessage('La cuidad debe tener entre 5 y 100 caracteres'),

        check('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido'),

        check('direccion')
        .trim()
        .notEmpty().withMessage('La direccion es obligatoria')
        .isLength({ min: 5, max: 100 }).withMessage('La direccion debe tener entre 5 y 100 caracteres'),

        check('telefono')
        .trim()
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone().withMessage('Debe ser un número de teléfono válido'),

        check('fechaNacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isISO8601().withMessage('La fecha debe tener el formato YYYY-MM-DD')
        .isBefore(new Date().toISOString().split('T')[0]).withMessage('La fecha de nacimiento no puede ser en el futuro'),

        (req,res,next) => {
            const errores = validationResult(req)
            
            if(!errores.isEmpty()) {
                const checkError = errores.array().map(error => error.msg)

                return res.status(400).json({msg:checkError})

            }
            next();
        }   
    ]
}
const valiActualizarEstudiante = () => {
    return [
        check('cedula')
        .optional()
        .trim()
        .notEmpty().withMessage('La cedula es obligatoria')
        .isNumeric().withMessage('La cedula debe contener solo numeros')
        .isLength({ min:10, max:13 }).withMessage('La cedula debe tener entre 10 y 13 digitos'),

        check('nombre')
        .optional()
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras y espacios'),

        check('apellido')
        .optional()
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El apellido solo puede contener letras y espacios'),

        check('cuidad')
        .optional()
        .trim()
        .notEmpty().withMessage('La cuidad es obligatoria')
        .isLength({ min: 5, max: 100 }).withMessage('La cuidad debe tener entre 5 y 100 caracteres'),

        check('email')
        .optional()
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido'),

        check('direccion')
        .optional()
        .trim()
        .notEmpty().withMessage('La direccion es obligatoria')
        .isLength({ min: 5, max: 100 }).withMessage('La direccion debe tener entre 5 y 100 caracteres'),

        check('telefono')
        .optional()
        .trim()
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isMobilePhone().withMessage('Debe ser un número de teléfono válido'),

        check('fechaNacimiento')
        .optional()
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isISO8601().withMessage('La fecha debe tener el formato YYYY-MM-DD')
        .isBefore(new Date().toISOString().split('T')[0]).withMessage('La fecha de nacimiento no puede ser en el futuro'),

        (req,res,next) => {
            const errores = validationResult(req)
            
            if(!errores.isEmpty()) {
                const checkError = errores.array().map(error => error.msg)

                return res.status(400).json({msg:checkError})

            }
            next();
        }   
    ]
}

export {
    validacionCrearEstudiante,
    valiActualizarEstudiante
}