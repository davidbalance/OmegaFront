'use client'

import { validateDni } from "@/server/registro-civil.action";
import { notifications } from "@mantine/notifications";
import { createContext, useCallback, useContext, useState } from "react";

interface MedicalClientValidateDniContextPorps {
    data: {
        dni: string | undefined,
        name: string | undefined,
        lastname: string | undefined,
    }
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

    const [client, setClient] = useState<{ dni: string | undefined, name: string | undefined, lastname: string | undefined }>({ dni: undefined, lastname: undefined, name: undefined });

    const validate = useCallback(async (dni: string) => {
        try {
            const data = await validateDni(dni);
            setClient(data);
        } catch (error) {
            console.error(error);
            notifications.show({ message: 'Ha ocurrido un error', color: 'red' });
            setClient({ dni: '', lastname: '', name: '' });
        }
    }, [])

    return (
        <MedicalClientValidateDniContext.Provider value={{
            data: client,
            validate
        }}>
            {children}
        </MedicalClientValidateDniContext.Provider>
    )
}

export default MedicalClientValidateDniProvider;