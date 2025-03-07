'use client'

import AreaForm from '@/components/area/area-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { editArea } from '@/server/area/actions';
import { Area, EditAreaPayload } from '@/server/area/server_types';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type EditAreaFormProps = Area;
const EditAreaForm: React.FC<EditAreaFormProps> = ({
    areaId,
    areaName
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (payload: Omit<EditAreaPayload, 'areaId'>) => {
            setLoading(true);
            try {
                await editArea({ ...payload, areaId });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [areaId, router]);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <AreaForm
                areaName={areaName}
                onSubmit={handleSubmit}
                loading={loading} />
        </>
    )
}

export default EditAreaForm