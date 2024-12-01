import Joi from "joi";

const schema = Joi.object({
    name: Joi
        .string()
        .required(),
    lastname: Joi
        .string()
        .required(),
    dni: Joi
        .string()
        .min(10)
        .max(10)
        .required()
        .messages({
            'string.min': 'La cedula debe tener minimo 10 caracteres',
            'string.max': 'La cedula debe tener maximo 10 caracteres',
        }),
    email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .empty()
        .required()
        .messages({
            'string.email': 'Correo invalido',
            'string.empty': 'Debe colocar un correo',
        }),
    gender: Joi
        .string()
        .valid('male', 'female')
        .required(),
    birthday: Joi
        .date()
        .required(),
    role: Joi
        .string()
        .optional()
});

export default schema;