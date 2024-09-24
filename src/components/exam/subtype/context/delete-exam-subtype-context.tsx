import { useFetch } from "@/hooks/useFetch";
import { ExamSubtype } from "@/lib/dtos/laboratory/exam/subtype/base.response.dto";
import { notifications } from "@mantine/notifications";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface DeleteExamSubtypeContextProps {
    trigger: (
        id: number,
        onStart?: () => void,
        onEnd?: () => void,
        onError?: () => void,
    ) => void;
}

const DeleteExamSubtypeContext = createContext<DeleteExamSubtypeContextProps | undefined>(undefined);

export const useDeleteExamSubtype = () => {
    const context = useContext(DeleteExamSubtypeContext);
    if (!context) {
        throw new Error('useDeleteExamSubtype must be used within a DeleteExamSubtypeProvider');
    }
    return context;
}

export const DeleteExamSubtypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [toDelete, setToDelete] = useState<number | null>(null);
    const [callbacks, setCallbacks] = useState<{ onStart?: () => void; onEnd?: () => void; onError?: () => void } | null>(null);
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const {
        data: examSubtypeData,
        error: examSubtypeError,
        reload: examSubtypeReload,
        reset: examSubtypeReset,
    } = useFetch(`/api/exam/subtypes/${toDelete}`, 'DELETE', { loadOnMount: false });

    const trigger = useCallback((id: number, onStart?: () => void, onEnd?: () => void, onError?: () => void) => {
        setToDelete(id);
        setCallbacks({ onStart, onEnd, onError });
        setShouldSendRequest(true);
    }, []);

    useEffect(() => {
        if (toDelete && shouldSendRequest) {
            callbacks?.onStart?.();
            examSubtypeReload();
            setShouldSendRequest(false);
        }
    }, [toDelete, shouldSendRequest, examSubtypeReload, callbacks]);

    useEffect(() => {
        if (examSubtypeError) {
            notifications.show({ message: examSubtypeError.message, color: 'red' });
            callbacks?.onError?.();
        }
    }, [examSubtypeError, callbacks]);

    useEffect(() => {
        if (examSubtypeData) {
            examSubtypeReset();
            callbacks?.onEnd?.();
        }
    }, [examSubtypeData, examSubtypeReset, callbacks]);

    return (
        <DeleteExamSubtypeContext.Provider value={{ trigger }}>
            {children}
        </DeleteExamSubtypeContext.Provider>
    );

}