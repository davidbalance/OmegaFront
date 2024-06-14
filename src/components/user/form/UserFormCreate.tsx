import { LoadingOverlay, rem, Stepper, Flex, Text, Button, Container } from '@mantine/core';
import { IconBuilding, IconChevronLeft, IconChevronRight, IconCircleCheck, IconDeviceFloppy, IconLicense, IconLock, IconUserCheck } from '@tabler/icons-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';
import { UserFormLogo } from './UserFormLogo';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { notifications } from '@mantine/notifications';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { User } from '@/lib/dtos/user/user.response.dto';
import { WebResource } from '@/lib/dtos/web/resources.response.dto';
import WebResourceFormAssign from '@/components/web/resource/form/WebResourceFormAssign';
import { UserForm } from './UserForm';
import { useMediaQuery } from '@mantine/hooks';
import { AuthenticationFormPassword } from '@/components/authentication/form/AuthenticationFormPassword';

type UserStepProps = {
    description: string; icon: React.ReactNode; step: {
        form: React.ElementType,
        props: any
    }
}

type UserFormCreateProps = {
    onClose: () => void;
    onFormSubmit?: (user: User) => void;
}

const UserFormCreate: React.FC<UserFormCreateProps> = ({ onClose, onFormSubmit }) => {

    const {
        data: createData,
        error: createError,
        loading: createLoading,
        body: createBody,
        request: createRequest,
        reload: createReload,
        reset: createReset
    } = useFetch<User>('/api/users', 'POST', { loadOnMount: false });

    const {
        data: webResources,
        error: webResourceError,
        loading: webResourceLoading
    } = useFetch<WebResource[]>('/api/web/resources', 'GET');

    const isMobile = useMediaQuery('(max-width: 50em)');

    const [active, setActive] = useState<number>(0);
    const [formData, setFormData] = useState<any>({});
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const steps = useMemo((): UserStepProps[] => [
        {
            description: 'Datos del usuario',
            icon: <IconUserCheck style={{ width: rem(16), height: rem(16) }} />,
            step: { form: UserForm, props: {} }
        },
        {
            description: 'Creacion de contraseña',
            icon: <IconLock style={{ width: rem(16), height: rem(16) }} />,
            step: { form: AuthenticationFormPassword, props: {} }
        },
        {
            description: 'Asignacion de roles',
            icon: <IconLicense style={{ width: rem(16), height: rem(16) }} />,
            step: { form: WebResourceFormAssign, props: { resources: webResources } }
        },
        {
            description: 'Asignacion de empresa',
            icon: <IconBuilding style={{ width: rem(16), height: rem(16) }} />,
            step: { form: UserFormLogo, props: {} }
        }
    ], []);

    const formReferences = useRef<React.RefObject<HTMLButtonElement>[]>(steps.map(() => React.createRef<HTMLButtonElement>()));

    const nextStep = useCallback(() => setActive((current) => (current < steps.length ? current + 1 : current)), []);
    const prevStep = useCallback(() => setActive((current) => (current > 0 ? current - 1 : current)), []);

    const handleNextChange = useCallback(() => {
        const formRef = formReferences.current[active];
        if (formRef && formRef.current) {
            formRef.current.click();
        }
    }, [formReferences, active]);

    const handleSubmit = useCallback((data: any) => {
        const newData = { ...formData, ...data };
        setFormData(newData);
        if (active === steps.length - 1) {
            createRequest(newData);
            setShouldSendRequest(true);
        } else {
            nextStep();
        }
    }, [nextStep, createRequest, formData]);

    const handleClose = useCallback(() => onClose(), [onClose]);

    useEffect(() => {
        if (createError) notifications.show({ message: createError.message, color: 'red' });
        else if (webResourceError) notifications.show({ message: webResourceError.message, color: 'red' });
    }, [createError, webResourceError]);

    useEffect(() => {
        if (shouldSendRequest && createBody) {
            createReload();
            setShouldSendRequest(false);
        }
    }, [shouldSendRequest, createBody, createReload]);

    useEffect(() => {
        if (createData) {
            onFormSubmit?.(createData);
            nextStep();
            createReset();
        }
    }, [createData, onFormSubmit, nextStep, createReset])

    return (
        <>
            <LoadingOverlay visible={createLoading || webResourceLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <SubLayoutFormTitle
                    title={'Formulario de creacion de usuarios'}
                    onClose={handleClose}></SubLayoutFormTitle>

                <ModularBox flex={1}>
                    <Stepper
                        active={active}
                        size='xs'
                        onStepClick={setActive}
                        allowNextStepsSelect={false}
                        h='100%'
                        completedIcon={<IconCircleCheck style={{ width: rem(16), height: rem(16) }} />}>
                        {
                            steps.map((step, index) => (
                                <Stepper.Step
                                    key={index}
                                    label={!isMobile && `Paso ${index + 1}`}
                                    description={!isMobile && step.description}
                                    icon={step.icon}>
                                    <Container mt={rem(44)}>
                                        <step.step.form
                                            data={{ ...formData }}
                                            ref={formReferences.current[index]}
                                            onSubmit={handleSubmit}
                                            {...step.step.props} />
                                    </Container>
                                </Stepper.Step>
                            ))
                        }
                        <Stepper.Completed>
                            <ModularBox>
                                <Flex justify="center" align="center" direction="column" wrap="wrap" c='green'>
                                    <IconCircleCheck style={{ width: rem(128), height: rem(128) }} />
                                    <Text size='lg'>El usuario ha sido creado</Text>
                                </Flex>
                            </ModularBox>
                        </Stepper.Completed>
                    </Stepper>
                </ModularBox>

                <ModularBox direction='row'>
                    {active < steps.length ?
                        (<>
                            {active !== 0 && <Button flex={1} size='xs' variant="default" onClick={prevStep} leftSection={<IconChevronLeft style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Atras</Button>}
                            {active < steps.length - 1
                                ? (<Button flex={1} size='xs' onClick={handleNextChange} rightSection={<IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Siguiente</Button>)
                                : (
                                    <Button flex={1} size='xs' onClick={handleNextChange} leftSection={<IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Guardar</Button>
                                )}
                        </>
                        ) : (
                            <Button flex={1} size='xs' onClick={handleClose}>Finalizar</Button>
                        )}
                </ModularBox>
            </Flex>
        </>
    );
}

export { UserFormCreate };