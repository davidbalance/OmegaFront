'use client'

import { validateDni } from "@/server/registro-civil.action";
import { notifications } from "@mantine/notifications";
import { createContext, useContext, useState } from "react";

interface MedicalClientValidateDniContextPorps {
    dni: string | undefined;
    name: string | undefined;
    lastname: string | undefined;
    validate: (dni: string) => Promise<void>;
}

const MedicalClientValidateDniContext = createContext<MedicalClientValidateDniContextPorps | undefined>(undefined);

export const useMedicalClientValidateDni = () => {
    const context = useContext(MedicalClientValidateDniContext);
    if (!context) {
        throw new Error('useCreateMedicalClient must be used within a MedicalClientValidateDniContext');
    }
    return context;
}

interface MedicalClientValidateDniProviderProps {
    children: React.ReactNode;
}

const MedicalClientValidateDniProvider: React.FC<MedicalClientValidateDniProviderProps> = ({
    children
}) => {

    const [dni, setDni] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [lastname, setLastname] = useState<string | undefined>(undefined);

    const validate = async (dni: string) => {
        try {
            console.log(dni);
            await validateDni(dni);
            setDni(dni);
        } catch (error) {
            console.error(error);
            notifications.show({ message: 'Ha ocurrido un error', color: 'red' });
        }
    }

    return (
        <MedicalClientValidateDniContext.Provider value={{
            dni,
            name,
            lastname,
            validate
        }}>
            {children}
        </MedicalClientValidateDniContext.Provider>
    )
}

export default MedicalClientValidateDniProvider;