'use client'

import React, { useState } from 'react'
import { notifications } from '@mantine/notifications';
import LoadingOverlay from '@/components/_base/loading-overlay';
import { useApiKey } from '../_context/api-key.context';
import { createApiKey } from '@/server';
import { CreateApiKeyPayload } from '@/server/apikey/server-types';
import { getErrorMessage } from '@/lib/utils/errors';
import ApiKeyForm from '@/components/api_key/api-key-form';

const CreateApiKeyForm: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const { setApiKey } = useApiKey();

    const handleSubmit = async (value: CreateApiKeyPayload) => {
        setLoading(true);
        try {
            const data = await createApiKey(value);
            setApiKey(data);
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ApiKeyForm onSubmit={handleSubmit} />
        </>
    )
}

export default CreateApiKeyForm