'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import BranchForm from '@/components/branch/branch-form';
import { getErrorMessage } from '@/lib/utils/errors';
import { createBranch } from '@/server';
import { BranchCreatePayload } from '@/server/branch/server-types';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type CreateBranchFormProps = {
    corporativeId: string;
    companyId: string;
}
const CreateBranchForm: React.FC<CreateBranchFormProps> = ({
    corporativeId,
    companyId
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (value: Omit<BranchCreatePayload, 'corporativeId' | 'companyId'>) => {
            setLoading(true);
            try {
                await createBranch({ ...value, corporativeId, companyId });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [router, corporativeId, companyId]);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <BranchForm
                onSubmit={(e) => handleSubmit({
                    name: e.branchName,
                    cityId: 78
                })} />
        </>
    )
}

export default CreateBranchForm