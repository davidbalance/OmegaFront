'use server'

import registroCivilConfig from "@/config/registro-civil.config";

export type Patient = {
    patientDni: string,
    patientName: string,
    patientLastname: string,
}
export const validateDni = async (dni: string): Promise<Patient> => {
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
        patientName: value.data.response.nombres,
        patientLastname: value.data.response.apellidos,
        patientDni: dni
    };
}