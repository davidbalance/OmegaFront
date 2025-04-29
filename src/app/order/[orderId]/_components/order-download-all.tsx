'use client'

import { MedicalCloudFile } from '@/server/medical-order/server-types'
import { MedicalFileZipPayload } from '@/server/medical-test/server-types'
import { Button, rem } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import React, { useCallback, useMemo } from 'react'
import { useCloudDownload } from '../_context/order-cloud-download.context'

type OrderFile = MedicalFileZipPayload & {
    hasFile: boolean;
}
interface OrderDownloadAllPorps {
    files: MedicalCloudFile[]
}
const OrderDownloadAll: React.FC<OrderDownloadAllPorps> = ({
    files: baseFiles
}) => {

    const { loading, trigger } = useCloudDownload();

    const files: MedicalFileZipPayload[] = useMemo(() =>
        baseFiles
            .map<OrderFile[]>(e => [
                { testId: e.testId, examName: e.examName, hasFile: e.resultHasFile, fileType: 'result' },
                { testId: e.testId, examName: e.examName, hasFile: e.reportHasContent, fileType: 'report' }
            ])
            .reduce((prev, curr) => [...prev, ...curr], [])
            .filter(e => e.hasFile),
        [baseFiles]);

    const handleClick = useCallback(() => trigger(files), [files, trigger]);

    return (
        <Button
            variant='filled'
            fullWidth
            size='sm'
            onClick={handleClick}
            loading={loading}
            leftSection={(
                <IconDownload style={{ width: rem(16), height: rem(16) }} stroke={1.5} />)}>
            Descargar todo
        </Button>
    )
}

export default OrderDownloadAll