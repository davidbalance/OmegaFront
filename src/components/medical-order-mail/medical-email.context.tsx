'use client'

import { useConfirmation } from '@/contexts/confirmation.context';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/email/base.response.dto';
import { sendMail } from '@/server/medical-order.actions';
import { notifications } from '@mantine/notifications';
import React, { createContext, useContext, useEffect, useState } from 'react'

interface MedicalEmailContextProps {
    email: MedicalClientEmail | undefined;
    options: MedicalClientEmail[];
    loading: boolean;
    selection: boolean;
    select: () => void;
    cancelSelection: () => void;
    trigger: (value?: MedicalClientEmail | undefined) => void;
}

const MedicalEmailContext = createContext<MedicalEmailContextProps | undefined>(undefined);

export const useMedicalEmail = () => {
    const context = useContext(MedicalEmailContext);
    if (!context) {
        throw new Error('useMedicalEmail must be used within a MedicalEmailProvider');
    }
    return context;
}

interface MedicalEmailProviderProps {
    children: React.ReactNode;
    order: number;
    values: MedicalClientEmail[];
}

const MedicalEmailProvider: React.FC<MedicalEmailProviderProps> = ({
    children,
    order,
    values
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<MedicalClientEmail | undefined>(undefined);
    const [selection, setSelection] = useState<boolean>(false);
    const { show } = useConfirmation();


    useEffect(() => {
        for (const value of values) {
            if (value.default) {
                setEmail(value);
                return;
            }
        }
    }, [values]);

    const trigger = async (value: MedicalClientEmail | undefined = undefined) => {
        setSelection(false);
        if (!value) {
            if (email) {
                value = email;
            } else {
                const state = await show('Enviar correo', `No hay ningun correo seleccionado por defecto, ¿Desea seleccionar uno?`);
                if (state) {
                    setSelection(true);
                }
                return;

            }
        }

        const state = await show('Enviar correo', `¿Deseas enviar a ${value.email}?`);
        if (state) {
            triggerSend(value.id);
        } else {
            if (values.length > 1) {
                const state = await show('Enviar correo', `¿Quieres seleccionar otro?`);
                if (state) {
                    setSelection(true);
                }
            }
        }
    }

    const triggerSend = async (mail: number) => {
        setLoading(true);
        try {
            await sendMail(Number(order), Number(mail));
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    const handleSelection = () => setSelection(true);
    const handleCancelSelection = () => setSelection(false);

    return (
        <MedicalEmailContext.Provider value={{
            email,
            loading,
            selection,
            options: values,
            select: handleSelection,
            cancelSelection: handleCancelSelection,
            trigger,
        }}>
            {children}
        </MedicalEmailContext.Provider>
    )
}

export default MedicalEmailProvider