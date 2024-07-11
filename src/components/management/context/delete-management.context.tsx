import { useFetch } from "@/hooks/useFetch";
import { Management } from "@/lib/dtos/location/management/response.dto";
import { notifications } from "@mantine/notifications";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface DeleteManagementContextProps {
    trigger: (
        management: Management,
        onStart?: () => void,
        onEnd?: () => void,
        onError?: () => void
    ) => void;
}

const DeleteManagementContext = createContext<DeleteManagementContextProps | undefined>(undefined);

export const useDeleteManagement = () => {
    const context = useContext(DeleteManagementContext);
    if (!context) {
        throw new Error('useDeleteManagemet must be used within a DeleteManagementProvider');
    }
    return context;
};

export const DeleteManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [managementToDelete, setManagementToDelete] = useState<Management | null>(null);
    const [callbacks, setCallbacks] = useState<{ onStart?: () => void; onEnd?: () => void; onError?: () => void } | null>(null);
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const {
        data: managementData,
        error: managementError,
        reload: managementReload,
        reset: managementReset,
    } = useFetch(`/api/management/${managementToDelete?.id}`, 'DELETE', { loadOnMount: false });

    const trigger = useCallback((management: Management, onStart?: () => void, onEnd?: () => void, onError?: () => void) => {
        setManagementToDelete(management);
        setCallbacks({ onStart, onEnd, onError });
        setShouldSendRequest(true);
    }, []);

    useEffect(() => {
        if (managementToDelete && shouldSendRequest) {
            callbacks?.onStart?.();
            managementReload();
            setShouldSendRequest(false);
        }
    }, [managementToDelete, shouldSendRequest, managementReload, callbacks]);

    useEffect(() => {
        if (managementError) {
            notifications.show({ message: managementError.message, color: 'red' });
            callbacks?.onError?.();
        }
    }, [managementError, callbacks]);

    useEffect(() => {
        if (managementData) {
            managementReset();
            callbacks?.onEnd?.();
        }
    }, [managementData, managementReset, callbacks]);

    return (
        <DeleteManagementContext.Provider value={{ trigger }}>
            {children}
        </DeleteManagementContext.Provider>
    );
};