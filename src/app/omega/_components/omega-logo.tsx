import auth from '@/lib/auth/auth';
import { systemLogo } from '@/components/navbar/nav/logo/logos';
import omega from '@/lib/api-client/omega-client/omega';
import { Flex, rem } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import React from 'react'

const OmegaLogo: React.FC = async () => {
    let Icon: React.ElementType;
    try {
        const session = await auth();
        const { logo }: { logo: string } = await omega().addToken(session.access_token).execute('accountLogo');
        Icon = systemLogo(logo);
    } catch (error) {
        return <IconExclamationCircle color='red' style={{ width: rem(40), height: rem(15) }} />
    }

    return (
        <Flex h='100%'>
            <Icon style={{ width: rem(48) }} />
        </Flex>
    )
}

export default OmegaLogo