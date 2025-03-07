'use client'

import ModalConfirmation from "@/components/_base/modal-confirmation";
import { useDisclosure } from "@mantine/hooks";
import { createContext, useCallback, useContext, useState } from "react";

interface ConfirmationContextProps {
    show: (title: string, message?: string) => Promise<boolean>;
}

const ConfirmationContext = createContext<ConfirmationContextProps | undefined>(undefined);

export const Confirmation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [opened, { close, open }] = useDisclosure(false);
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => { });

    const show = useCallback((title: string, message?: string) => {
        setTitle(title);
        setMessage(message);
        open();

        return new Promise<boolean>((resolve) => {
            setResolvePromise(() => resolve);
        });
    }, [open]);

    const handleResponse = (response: boolean) => {
        close();
        resolvePromise(response);
    }

    return (
        <ConfirmationContext.Provider value={{ show: show }}>
            {children}
            <ModalConfirmation
                opened={opened}
                onClose={() => handleResponse(false)}
                title={title}
                message={message}
                onConfirm={() => handleResponse(true)}
                zIndex={1000} />
        </ConfirmationContext.Provider>
    );
}

export const useConfirmation = () => {
    const context = useContext(ConfirmationContext);
    if (!context) {
        throw new Error('useConfirmation must be used within a ConfirmationProvider');
    }
    return context;
}