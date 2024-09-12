'use client'

import React, { FormEvent, useState } from 'react'
import Form from '@/components/api-key-form'
import { parseForm } from '@/lib/utils/form-parse';
import { notifications } from '@mantine/notifications';
import { createApikey } from '@/server/api-key.actions';
import LoadingOverlay from '@/components/_base/loading-overlay';
import { useApikey } from './apikey.context';

const ApikeyForm: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const { setApikey } = useApikey();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values: any = parseForm(event.currentTarget);
        setLoading(true);
        try {
            const value = await createApikey(values);
            setApikey(value);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <Form onSubmit={handleSubmit} />
        </>
    )
}

export default ApikeyForm