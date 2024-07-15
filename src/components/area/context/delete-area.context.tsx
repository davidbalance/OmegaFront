import { useFetch } from "@/hooks/useFetch";
import { Area } from "@/lib/dtos/location/area/response.dto";
import { notifications } from "@mantine/notifications";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface DeleteAreaContextProps {
    trigger: (
        area: Area,
        onStart?: () => void,
        onEnd?: () => void,
        onError?: () => void
    ) => void;
}

const DeleteAreaContext = createContext<DeleteAreaContextProps | undefined>(undefined);

export const useDeleteArea = () => {
    const context = useContext(DeleteAreaContext);
    if (!context) {
        throw new Error('useDeleteManagemet must be used within a DeleteAreaProvider');
    }
    return context;
};

export const DeleteAreaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [areaToDelete, setAreaToDelete] = useState<Area | null>(null);
    const [callbacks, setCallbacks] = useState<{ onStart?: () => void; onEnd?: () => void; onError?: () => void } | null>(null);
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const {
        data: areaData,
        error: areaError,
        reload: areaReload,
        reset: areaReset,
    } = useFetch(`/api/area/${areaToDelete?.id}`, 'DELETE', { loadOnMount: false });

    const trigger = useCallback((area: Area, onStart?: () => void, onEnd?: () => void, onError?: () => void) => {
        setAreaToDelete(area);
        setCallbacks({ onStart, onEnd, onError });
        setShouldSendRequest(true);
    }, []);

    useEffect(() => {
        if (areaToDelete && shouldSendRequest) {
            callbacks?.onStart?.();
            areaReload();
            setShouldSendRequest(false);
        }
    }, [areaToDelete, shouldSendRequest, areaReload, callbacks]);

    useEffect(() => {
        if (areaError) {
            notifications.show({ message: areaError.message, color: 'red' });
            callbacks?.onError?.();
        }
    }, [areaError, callbacks]);

    useEffect(() => {
        if (areaData) {
            areaReset();
            callbacks?.onEnd?.();
        }
    }, [areaData, areaReset, callbacks]);

    return (
        <DeleteAreaContext.Provider value={{ trigger }}>
            {children}
        </DeleteAreaContext.Provider>
    );
};