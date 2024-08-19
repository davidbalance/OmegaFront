import { notifications } from "@mantine/notifications";
import { useCallback, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";

const useMedicalResultFileDelete = (id: number, cb?: () => void): [boolean, () => void] => {

    const {
        data: deleteData,
        loading: deleteLoading,
        error: deleteError,
        reload: deleteReload,
        reset: deleteReset,
    } = useFetch(`/api/medical/file/result/${id}`, 'DELETE', { loadOnMount: false });

    useEffect(() => {
        if (deleteData) {
            cb?.();
            deleteReset();
        }
    }, [deleteData, deleteReset, cb]);

    useEffect(() => {
        if (deleteError) notifications.show({ message: deleteError.message, color: 'red' });
    }, [deleteError]);

    const trigger = () => useCallback(() => {
        deleteReload();
    }, [deleteReload]);


    return [deleteLoading, trigger];
}

export { useMedicalResultFileDelete };