import { useUserCreate } from '@/hooks';
import { useRole } from '@/hooks/useRole';
import { LoadingOverlay, rem, Stepper, Flex, Text, Button, Container } from '@mantine/core';
import { IconBuilding, IconChevronLeft, IconChevronRight, IconCircleCheck, IconDeviceFloppy, IconLicense, IconLock, IconUserCheck } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react'
import UserDataForm from '../user-data-form/UserDataForm';
import { AuthenticationPasswordForm } from '@/components/authentication/authentication-password';
import { AssignRoleForm } from '@/components/role/assign-role';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';
import { UserLogoForm } from '../user-logo-form/UserLogoForm';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { User } from '@/services/api/user/dtos';
import { notifications } from '@mantine/notifications';

type UserStepProps = {
    description: string; icon: React.ReactNode; step: {
        form: React.ElementType,
        props: any
    }
}

type UserCreateFormProps = {
    matches: boolean | undefined,
    loading: boolean;
    onClose: () => void;
    onFormSubmit: (user: User) => void;
}

const UserCreateForm: React.FC<UserCreateFormProps> = ({ onClose, onFormSubmit, loading, matches }) => {

    const { user, error, isLoading, isComplete, create, clean } = useUserCreate();
    const roleHook = useRole(true);

    const [active, setActive] = useState<number>(0);
    const [formData, setFormData] = useState<any>({});

    const steps: UserStepProps[] = [
        {
            description: 'Datos del usuario',
            icon: <IconUserCheck style={{ width: rem(16), height: rem(16) }} />,
            step: { form: UserDataForm, props: {} }
        },
        {
            description: 'Creacion de contraseña',
            icon: <IconLock style={{ width: rem(16), height: rem(16) }} />,
            step: { form: AuthenticationPasswordForm, props: {} }
        },
        {
            description: 'Asignacion de roles',
            icon: <IconLicense style={{ width: rem(16), height: rem(16) }} />,
            step: {
                form: AssignRoleForm,
                props: {
                    roles: roleHook.roles
                }
            }
        },
        {
            description: 'Asignacion de empresa',
            icon: <IconBuilding style={{ width: rem(16), height: rem(16) }} />,
            step: {
                form: UserLogoForm,
                props: {}
            }
        }
    ];

    const formReferences = useRef<React.RefObject<HTMLButtonElement>[]>(steps.map(() => React.createRef<HTMLButtonElement>()));

    const nextStep = () => setActive((current) => (current < steps.length - 1 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleNextChange = () => {
        const formRef = formReferences.current[active];
        if (formRef && formRef.current) {
            formRef.current.click();
        }
    };

    const handleSubmit = (data: any) => {
        const newData = { ...formData, ...data };
        setFormData(newData);
        if (active === steps.length - 1) {
            create(newData);
        } else {
            nextStep();
        }
    };

    const handleClose = () => {
        onClose();
        clean();
    }

    useEffect(() => {
        if (error) {
            notifications.show({
                message: error.message,
                color: 'red'
            });
        }
    }, [error])

    useEffect(() => {
        if (isComplete && user) {
            onFormSubmit(user);
            nextStep();
        }
    }, [isComplete, user]);


    return (
        <>
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
                                    label={!matches && `Paso ${index + 1}`}
                                    description={!matches && step.description}
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

export { UserCreateForm };