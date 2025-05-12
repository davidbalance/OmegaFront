"use client"

import LoadingOverlay from '@/components/_base/loading-overlay';
import { getErrorMessage } from '@/lib/utils/errors';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import BaseOrderProcessForm from './base-order-process-form';
import { updateMedicalOrderProcess } from '@/server';

type OrderProcessFormProps = Omit<React.ComponentPropsWithoutRef<typeof BaseOrderProcessForm>, 'onSubmit' | 'loading'> & {
    orderId: string
}
const OrderProcessForm: React.FC<OrderProcessFormProps> = ({
    orderId,
    ...props
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(async (payload: { process: string }) => {
        setLoading(true);
        try {
            await updateMedicalOrderProcess({ ...payload, orderId });
            router.back();
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [orderId, router])


    return (
        <>
            <LoadingOverlay visible={loading} />
            <BaseOrderProcessForm
                loading={loading}
                onSubmit={handleSubmit}
                {...props} />
        </>
    )
}

export default OrderProcessForm