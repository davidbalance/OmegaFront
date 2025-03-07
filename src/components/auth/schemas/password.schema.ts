import { z } from "zod";

const schema = z.object({
    password: z.coerce.string().nonempty()
        .min(8, {
            message: "La contraseña debe ser de 8 caracteres minimo"
        })
        .refine((value) => /[A-Z]/.test(value), {
            message: "La contraseña debe tener al menos una mayuscula"
        })
        .refine((value) => /[0-9]/.test(value), {
            message: "La contraseña debe tener al menos un numero"
        })
        .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: "La contraseña debe tener al menos un caracter especial"
        }),
    confirmPassword: z.coerce.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'No coinciden las contraseñas'
});

export default schema;