'use client'

import { Patient, validateDni } from "@/server/registro-civil.action";
import { notifications } from "@mantine/notifications";
import { createContext, useCallback, useContext, useState } from "react";

interface DniValidationContextPorps {
    data: Patient | null,
    validate: (dni: string) => Promise<void>;
}

const DniValidationContext = createContext<DniValidationContextPorps | undefined>(undefined);

export const useDniValidation = () => {
    const context = useContext(DniValidationContext);
    if (!context) {
        throw new Error('useDniValidation must be used within a DniValidationContext');
    }
    return context;
}

type DniValidationProviderProps = {
    children: React.ReactNode;
}

const DniValidationProvider: React.FC<DniValidationProviderProps> = ({
    children
}) => {

    const [patient, setPatient] = useState<Patient | null>(null);

    const validate = useCallback(async (dni: string) => {
        try {
            const data = await validateDni(dni);
            setPatient(data);
        } catch (error) {
            console.error(error);
            notifications.show({ message: 'Ha ocurrido un error', color: 'red' });
            setPatient(null);
        }
    }, [])

    return (
        <DniValidationContext.Provider value={{
            data: patient,
            validate
        }}>
            {children}
        </DniValidationContext.Provider>
    )
}

export default DniValidationProvider;