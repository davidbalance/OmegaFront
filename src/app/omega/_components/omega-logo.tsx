import { auth } from '@/app/api/auth/[...nextauth]/route';
import { systemLogo } from '@/components/navbar/nav/logo/logos';
import omega from '@/lib/api-client/omega-client/omega';
import { GetOmegaWebClientResponseDto } from '@/lib/dtos/omega/web/client/response.dto';
import { Flex, rem } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import React from 'react'

const getOmegaLogo = async () => {

}

const OmegaLogo: React.FC = async () => {
    let Icon: React.ElementType;
    try {
        const session = await auth();
        if (!session) redirect('/login');
        const { logo }: GetOmegaWebClientResponseDto = await omega().addToken(session.access_token).execute('webClientDetails');
        Icon = systemLogo(logo.name);
    } catch (error) {6
        return <IconExclamationCircle color='red' style={{ width: rem(40), height: rem(15) }} />
    }

    return (
        <Flex h='100%'>
            <Icon style={{ width: rem(48) }} />
        </Flex>
    )
}

export default OmegaLogo