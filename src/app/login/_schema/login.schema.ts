import Joi from "joi";

const loginSchema = Joi.object({
    username: Joi
        .string()
        .email({ tlds: { allow: false } })
        .empty()
        .required()
        .messages({
            'string.email': 'Correo invalido',
            'string.empty': 'Debe colocar un correo',
        }),
    password: Joi
        .string()
        .empty()
        .required()
        .messages({
            'string.empty': 'Debe ingresar una contraseña'
        })
});


export default loginSchema;