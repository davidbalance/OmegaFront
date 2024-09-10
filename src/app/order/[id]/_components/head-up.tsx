'use client'

import { ModularBox } from '@/components/modular/box/ModularBox';
import { Avatar, Box, rem, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconUser } from '@tabler/icons-react';
import React from 'react'

interface HeadUpProps {
    fullname: string;
    dni: string
}
const HeadUp: React.FC<HeadUpProps> = ({
    dni,
    fullname
}) => {

    const { breakpoints } = useMantineTheme();
    const match = useMediaQuery(`min-width: ${breakpoints.md}`);

    return (
        <Box w={match ? '100%' : rem(240)}>
            <ModularBox h='100%' align='center' pos='relative' direction={match ? 'row-reverse' : 'column'}>
                <Avatar color="orange" radius="lg" size={match ? rem(36) : rem(160)}>
                    <IconUser style={{ width: match ? rem(20) : rem(120), height: match ? rem(20) : rem(120) }} />
                </Avatar>
                <Box w='100%'>
                    {match ? <Text fw={500}>{fullname}</Text> : <Title order={6} ta='center'>{fullname}</Title>}
                    {!match && <Text ta='center'>{dni}</Text>}
                </Box>
            </ModularBox>
        </Box>
    );
}

export default HeadUp