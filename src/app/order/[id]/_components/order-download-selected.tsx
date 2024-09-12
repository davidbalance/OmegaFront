'use client'

import { Button, rem } from '@mantine/core'
import { IconSelectAll } from '@tabler/icons-react'
import React from 'react'
import { useCloudDownload } from './order-cloud-download.context'

const OrderDownloadSelected: React.FC = () => {

    const { loading } = useCloudDownload();

    return (
        <Button
            type='submit'
            variant='light'
            fullWidth
            size='sm'
            loading={loading}
            leftSection={(
                <IconSelectAll style={{ width: rem(16), height: rem(16) }} />
            )}>
            Descargar seleccionados
        </Button>
    )
}

export default OrderDownloadSelected