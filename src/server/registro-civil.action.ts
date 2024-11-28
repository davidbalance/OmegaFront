'use server'

import registroCivilConfig from "@/config/registro-civil.config";

export const validateDni = async (dni: string): Promise<any> => {
    const res = await fetch(registroCivilConfig.uri.replace('$dni', dni), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${registroCivilConfig.token}`
        }
    });

    const value = await res.json();
    if (!res.ok) {
        throw new Error(value);
    }

    if (value.error) {
        throw new Error(value.data.error);
    }

    return value.data;
}