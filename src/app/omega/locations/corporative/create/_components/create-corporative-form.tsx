'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import CorporativeForm from '@/components/corporative/corporative-form'
import { getErrorMessage } from '@/lib/utils/errors';
import { createCorporative } from '@/server/corporative/actions';
import { CorporativeCreatePayload } from '@/server/corporative/server_types';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

const CreateCorporativeForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (value: CorporativeCreatePayload) => {
            setLoading(true);
            try {
                await createCorporative({ ...value });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [router]);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <CorporativeForm onSubmit={(e) => handleSubmit({ name: e.corporativeName })} />
        </>
    )
}

export default CreateCorporativeForm