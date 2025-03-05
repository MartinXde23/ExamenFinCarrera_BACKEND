import { check, validationResult } from "express-validator";

const validacionCrearMatricula = () => {
    return [

        check('codigo')
        .trim()
        .notEmpty().withMessage('El codigo es obligatorio')
        .isAlphanumeric().withMessage('El código solo puede contener letras y números')
        .isLength({ min: 3, max: 10 }).withMessage('El código debe tener entre 3 y 10 caracteres'),

        check('descripcion')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 5, max: 500 }).withMessage('La descripción debe tener entre 5 y 500 caracteres'),

        check('creditos')
        .trim()
        .notEmpty().withMessage('Los créditos son obligatorios')
        .isNumeric().withMessage('Los créditos deben ser un número')
        .isInt({ min: 1, max: 10 }).withMessage('Los créditos deben estar entre 1 y 10'),

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
const valiActualizarMatricula = () => {
    return [

        check('codigo')
        .optional()
        .trim()
        .notEmpty().withMessage('El codigo es obligatorio')
        .isAlphanumeric().withMessage('El código solo puede contener letras y números')
        .isLength({ min: 3, max: 10 }).withMessage('El código debe tener entre 3 y 10 caracteres'),

        check('descripcion')
        .optional()
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres'),

        check('creditos')
        .optional()
        .trim()
        .notEmpty().withMessage('Los créditos son obligatorios')
        .isNumeric().withMessage('Los créditos deben ser un número')
        .isInt({ min: 1, max: 10 }).withMessage('Los créditos deben estar entre 1 y 10'),

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
    validacionCrearMatricula,
    valiActualizarMatricula
}