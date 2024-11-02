import { ModularBox } from '@/components/modular/box/ModularBox'
import { rem, Stack, Title } from '@mantine/core'
import React from 'react'
import DownloadZip from './_components/download-zip'

interface OmegaTreeCodeProps {
    params: { code: string }
}
const OmegaTreeCode: React.FC<OmegaTreeCodeProps> = async ({
    params
}) => {

    return (
        <ModularBox>
            <Stack
                gap={rem(8)}
                justify='center'
                h='100%'>
                <Title size='md' >Tu archivo esta listo</Title>
                <DownloadZip code={params.code} />
            </Stack>
        </ModularBox>
    )
}

export default OmegaTreeCode