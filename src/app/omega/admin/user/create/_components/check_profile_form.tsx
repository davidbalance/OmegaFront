'use client'

import React, { useCallback } from 'react'
import { Button, Flex, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { AuthRegisterPayload } from '@/lib/auth/auth.types';
import { Resource } from '@/server/resource/server_types';
import { Logo } from '@/server/logo/server_types';
import Title from '@/components/_base/mantine/title';

type CheckProfileFormProps = {
    data?: AuthRegisterPayload;
    resources: Resource[];
    logos: Logo[];
    onSubmit?: (value: AuthRegisterPayload) => void;
}
const CheckProfileForm = React.forwardRef<HTMLFormElement, CheckProfileFormProps>(({
    data,
    resources,
    logos,
    onSubmit
}, ref) => {

    const handleSubmit = useCallback(() => {
        if (data) {
            onSubmit?.({ ...data });
        }
    }, [data, onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={handleSubmit}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Stack>
                    <Group align='center'>
                        <Title order={5} component='span' fw='bold'>Nombre:</Title>
                        <Text component='span'>{`${data?.name ?? ''} ${data?.lastname}`}</Text>
                    </Group>
                    <Group align='center'>
                        <Title order={5} component='span' fw='bold'>Cedula:</Title>
                        <Text component='span'>{data?.dni ?? ''}</Text>
                    </Group>
                    <Group align='center'>
                        <Title order={5} component='span' fw='bold'>Email:</Title>
                        <Text component='span'>{data?.email ?? ''}</Text>
                    </Group>
                    <Group align='center'>
                        <Title order={5} component='span' fw='bold'>Logo:</Title>
                        <Text component='span'>{logos.find(e => e.logoId === data?.logo)?.logoName}</Text>
                    </Group>
                </Stack>
                <Stack>
                    <Title order={5} component='span' fw='bold'>Paginas: {data?.resources.length}</Title>
                    {resources.filter(e => data?.resources.some(x => x === e.resourceId)).map(e => (<Text key={e.resourceId}>{e.resourceLabel}</Text>))}
                </Stack>
            </SimpleGrid>

            <Button type='submit' style={{ display: 'none' }} />
        </form>
    );
});

CheckProfileForm.displayName = 'CheckProfileForm';

export default CheckProfileForm