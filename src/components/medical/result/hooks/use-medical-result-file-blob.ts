import { useFetch } from "@/hooks/useFetch";
import { notifications } from "@mantine/notifications";
import { useCallback, useEffect } from "react";

const useMedicalResultFileBlob = (id: number, cb: (blob: Blob) => void): [boolean, () => void] => {
    const {
        data: fileBlob,
        loading: fileLoading,
        error: fileError,
        reload: fileReload,
        reset: fileReset
    } = useFetch<Blob>(`/api/medical/file/result/${id}`, 'GET', { loadOnMount: false, type: 'blob' });

    useEffect(() => {
        if (fileBlob) {
            cb?.(fileBlob);
            fileReset();
        }
    }, [fileBlob, fileReset, cb]);

    useEffect(() => {
        if (fileError) notifications.show({ message: fileError.message, color: 'red' });
    }, [fileError]);

    const trigger = () => useCallback(() => {
        fileReload();
        notifications.show({ message: 'La descarga ha comenzado', color: 'green' });
    }, [fileReload]);

    return [fileLoading, trigger];
}

export { useMedicalResultFileBlob };