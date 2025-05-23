'use client'

import { Checkbox, rem, Stack } from '@mantine/core'
import React from 'react'
import { MedicalFileZipPayload } from '@/server/medical-test/server-types'
import { useCloudDownload } from '../_context/order-cloud-download.context'

type OrderCloudCheckProps = MedicalFileZipPayload & {
    hasFile: boolean;
    children: React.ReactNode;
};
const OrderCloudCheck: React.FC<OrderCloudCheckProps> = ({
    testId,
    examName,
    fileType,
    hasFile,
    children
}) => {

    const { addFile, removeFile } = useCloudDownload();

    return (
        <>
            {hasFile
                ? <Checkbox
                    w='100%'
                    defaultChecked={false}
                    onChange={(e) => e.currentTarget.checked
                        ? addFile({ testId, examName, fileType })
                        : removeFile({ testId, examName, fileType })
                    }
                    label={<Stack
                        gap={rem(8)}>
                        {children}
                    </Stack>} />
                : <Stack
                    gap={rem(8)}>
                    {children}
                </Stack>}
        </>
    )
}

export default OrderCloudCheck