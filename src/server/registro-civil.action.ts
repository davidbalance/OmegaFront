'use server'

import registroCivilConfig from "@/config/registro-civil.config";

export const validateDni = async (dni: string): Promise<{
    name: string,
    lastname: string,
    dni: string,
}> => {
    const res = await fetch(registroCivilConfig.uri.replace(':dni', dni), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${registroCivilConfig.token}`
        }
    });

    if (!res.ok) {
        throw new Error('Something went wrong');
    }

    const value = await res.json();
    if (value.error) {
        throw new Error(value.data.error);
    }

    return {
        name: value.data.response.nombres,
        lastname: value.data.response.apellidos,
        dni: dni
    };
}