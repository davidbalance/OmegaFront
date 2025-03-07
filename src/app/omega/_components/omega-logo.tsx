import { systemLogo } from '@/components/navbar/nav/logo/logos';
import { Flex, rem } from '@mantine/core';
import React from 'react'

const OmegaLogo: React.FC<{ logo: string | null }> = async ({
    logo
}) => {
    let Icon: React.ElementType;
    Icon = systemLogo(logo || 'omega');

    return (
        <Flex h='100%'>
            <Icon style={{ width: rem(48) }} />
        </Flex>
    )
}

export default OmegaLogo