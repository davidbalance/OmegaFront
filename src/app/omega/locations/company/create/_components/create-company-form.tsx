'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import CompanyForm from '@/components/company/company-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { createCompany } from '@/server/company/actions';
import { CompanyCreatePayload } from '@/server/company/server_types';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type CreateCompanyFormProps = {
    corporativeId: string;
}
const CreateCompanyForm: React.FC<CreateCompanyFormProps> = ({
    corporativeId
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (value: Omit<CompanyCreatePayload, 'corporativeId'>) => {
            setLoading(true);
            try {
                await createCompany({ ...value, corporativeId });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [router, corporativeId]);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <CompanyForm
                onSubmit={(e) => handleSubmit({
                    address: e.companyAddress,
                    ruc: e.companyRuc,
                    phone: e.companyPhone,
                    name: e.companyName
                })} />
        </>
    )
}

export default CreateCompanyForm