import { ModularBox } from '@/components/modular-box/ModularBox';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';
import WebResourceFormAssign from '@/components/web/resource/form/WebResourceFormAssign';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { User } from '@/lib/dtos/user/user.response.dto';
import { WebResource } from '@/lib/dtos/web/resources.response.dto';
import { LoadingOverlay, Flex, rem, Box, Button, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface UserFormWebResourceProps {
    onClose: () => void;
    user: User;
}

const UserFormWebResource: React.FC<UserFormWebResourceProps> = ({ user, onClose }) => {

    const { data: webResources,
        error: webResourceError,
        loading: webResourceLoading } = useFetch<WebResource[]>('/api/web/resources', 'GET');

    const { data: clientResources,
        error: clientResourceError,
        loading: clientResourceLoading } = useFetch<WebResource[]>(`/api/web/clients/resources/${user.id}`, 'GET');

    const { data: patchResource,
        error: patchResourceError,
        loading: patchResourceLoading,
        reload: patchResourceReload,
        body: patchResourceBody,
        request: patchResourceRequest,
        reset: patchResourceReset
    } = useFetch<any>(`/api/web/clients/resources/${user.id}`, 'PATCH', { loadOnMount: false });

    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = useCallback(async ({ resources }: { resources: number[] }) => {
        patchResourceRequest({ resources });
        setShouldSendRequest(true);
    }, [patchResourceRequest]);


    useEffect(() => {
        if (webResourceError) notifications.show({ message: webResourceError.message, color: 'red' });
        else if (clientResourceError) notifications.show({ message: clientResourceError.message, color: 'red' });
        else if (patchResourceError) notifications.show({ message: patchResourceError.message, color: 'red' });
    }, [webResourceError, clientResourceError, patchResourceError]);

    useEffect(() => {
        if (shouldSendRequest && patchResourceBody) {
            patchResourceReload();
            setShouldSendRequest(false);
        }
    }, [shouldSendRequest, patchResourceBody, patchResourceReload]);


    useEffect(() => {
        if (patchResource) {
            onClose();
            patchResourceReset();
        }
    }, [patchResource]);

    return (
        <>
            <LoadingOverlay visible={webResourceLoading || clientResourceLoading || patchResourceLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <SubLayoutFormTitle
                    title={'Formulario de asignacion de roles'}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Box pt={rem(16)} w='100%' maw={rem(700)}>
                        {
                            clientResources
                                ? <WebResourceFormAssign
                                    ref={buttonRef}
                                    onSubmit={handleSubmit}
                                    resources={webResources || []}
                                    data={{ resources: clientResources.map(e => e.id) }} />
                                : <Text>No se han encontrado paginas</Text>
                        }
                    </Box>
                </ModularBox>

                <ModularBox direction='row'>
                    <Button flex={1} size='xs' onClick={() => buttonRef.current?.click()} leftSection={
                        <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Guardar
                    </Button>
                </ModularBox>
            </Flex>
        </>
    )
}

export { UserFormWebResource }