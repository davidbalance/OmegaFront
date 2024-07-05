import { useFetch } from '@/hooks/useFetch';
import { Menu, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import React, { useCallback, useEffect, useState } from 'react'

interface MedicalResultDeleteFileMenuItemProps {
    id: number;
    type: "result" | "report";
    onError?: () => void;
    onStart?: () => void;
    onComplete?: () => void;
}
const MedicalResultDeleteFileMenuItem: React.FC<MedicalResultDeleteFileMenuItemProps> = ({
    id,
    type,
    onStart,
    onComplete,
    onError
}) => {

    const {
        data,
        error,
        reload,
        reset,
    } = useFetch(`/api/medical/file/${type}/${id}`, 'DELETE', { loadOnMount: false });

    const [shouldFetch, setShouldFetch] = useState<boolean>(false);

    const handleDeleteResult = useCallback(() => {
        setShouldFetch(true);
    }, []);

    useEffect(() => {
        if (error) {
            notifications.show({ message: error.message, color: 'red' });
            if (onError) onError();
        }
    }, [error/* , onError */]);

    useEffect(() => {
        if (shouldFetch) {
            onStart?.();
            reload();
            setShouldFetch(false);
        }
    }, [shouldFetch, reload, onStart]);

    useEffect(() => {
        if (data) {
            reset();
            onComplete?.();
        }
    }, [data, reset, onComplete, id]);


    return (
        <Menu.Item onClick={handleDeleteResult} leftSection={
            <IconTrash style={{ width: rem(16), height: rem(16) }} />
        }>
            Eliminar Archivo
        </Menu.Item>
    )
}

export { MedicalResultDeleteFileMenuItem };