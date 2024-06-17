import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { useFetch } from '@/hooks/useFetch/useFetch';
import { GETUserAttributeRequestDto } from '@/lib/dtos/user/user.response.dto';
import { LoadingOverlay, Flex, rem, Box, Button, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import React, { useEffect, useRef, useState } from 'react'
import { UserFormAssignCompany } from './UserFormAssignCompany';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { PATCHUserAttributeRequestDto } from '@/lib/dtos/user/user.request.dto';

interface UserFormAssignLookForCompanyProps {
    user: number;
    onClose: () => void;
}
const UserFormAssignLookForCompany: React.FC<UserFormAssignLookForCompanyProps> = ({ user, onClose }) => {

    const [shouldPatch, setShouldPatch] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const {
        data: fetchAttribute,
        error: attributeError,
        loading: attributeLoading
    } = useFetch<GETUserAttributeRequestDto>(`/api/users/attribute/look/for/company/${user}`, 'GET');

    const {
        data: patchAttribute,
        error: patchAttributeError,
        loading: patchAttributeLoading,
        body: patchAttributeBody,
        reload: patchAttributeReload,
        request: patchAttributeRequest,
        reset: patchAttributeReset,
    } = useFetch<any>(`/api/users/attribute/look/for/company/${user}`, 'PATCH', { loadOnMount: false });

    const handleFormSubmittionEvent = (value: string) => {
        setShouldPatch(true);
        patchAttributeRequest<PATCHUserAttributeRequestDto>({ value });
    }

    const handleClickEventSubmit = () => {
        buttonRef.current?.click();
    }

    useEffect(() => {
        if (attributeError) notifications.show({ message: attributeError.message, color: 'red' });
        else if (patchAttributeError) notifications.show({ message: patchAttributeError.message, color: 'red' });
    }, [attributeError || patchAttributeError]);

    useEffect(() => {
        if (shouldPatch && patchAttributeBody) {
            patchAttributeReload();
            setShouldPatch(false);
        }
    }, [shouldPatch, patchAttributeBody, patchAttributeReload]);

    useEffect(() => {
        if (patchAttribute) {
            onClose();
            patchAttributeReset();
        }
    }, [patchAttribute, patchAttributeReset])

    return (
        <>
            <LoadingOverlay visible={attributeLoading || patchAttributeLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <LayoutSubFormTitle
                    title={'Formulario de asignacion de empresas'}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Title
                        order={6}
                        mt={rem(16)}>{fetchAttribute
                            ? `Este usuario tiene asignada la empresa: ${fetchAttribute.value}`
                            : 'No tiene asignado ninguna empresa'}
                    </Title>
                    <Box pt={rem(16)} w='100%' maw={rem(700)}>
                        <UserFormAssignCompany
                            value={fetchAttribute?.value}
                            onFormSubmittion={handleFormSubmittionEvent}
                            ref={buttonRef} />
                    </Box>
                </ModularBox>

                <ModularBox direction='row'>
                    <Button
                        flex={1}
                        size='xs'
                        onClick={handleClickEventSubmit}
                        leftSection={
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5} />}
                    >
                        Guardar
                    </Button>
                </ModularBox>
            </Flex>

        </>
    )
}

export default UserFormAssignLookForCompany