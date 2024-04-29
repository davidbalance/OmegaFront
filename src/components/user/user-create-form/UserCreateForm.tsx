import { useUser } from '@/hooks';
import { useRole } from '@/hooks/useRole';
import { LoadingOverlay, Group, rem, ActionIcon, Stepper, Box, Flex, Text, Button } from '@mantine/core';
import { IconCircleCheck, IconDeviceFloppy, IconLicense, IconLock, IconUserCheck, IconX } from '@tabler/icons-react';
import React, { useRef, useState } from 'react'
import UserDataForm from '../user-data-form/UserDataForm';
import { AuthenticationPasswordForm } from '@/components/authentication/authentication-password';
import { AssignRoleForm } from '@/components/role/assign-role';

type UserStepProps = {
    description: string; icon: React.ReactNode; step: {
        form: React.ElementType,
        props: any
    }
}

type UserCreateFormProps = {
    onClose: () => void;
    onComplete?: () => void;
}

const UserCreateForm: React.FC<UserCreateFormProps> = ({ onClose, onComplete }) => {

    const userHook = useUser();
    const roleHook = useRole(true);

    const [active, setActive] = useState(0);
    const [formData, setFormData] = useState<any>({});

    const steps: UserStepProps[] = [
        {
            description: 'Datos del usuario',
            icon: <IconUserCheck style={{ width: rem(18), height: rem(18) }} />,
            step: { form: UserDataForm, props: {} }
        },
        {
            description: 'Creacion de contraseña',
            icon: <IconLock style={{ width: rem(18), height: rem(18) }} />,
            step: { form: AuthenticationPasswordForm, props: {} }
        },
        {
            description: 'Asignacion de roles',
            icon: <IconLicense style={{ width: rem(18), height: rem(18) }} />,
            step: {
                form: AssignRoleForm,
                props: {
                    roles: roleHook.roles
                }
            }
        }
    ];

    const formReferences = useRef<React.RefObject<HTMLButtonElement>[]>([]);
    if (formReferences.current.length < steps.length) {
        formReferences.current = steps.map(() => React.createRef<HTMLButtonElement>());
    }

    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleNextChange = () => {
        if (active < steps.length) {
            const formRef = formReferences.current[active];
            if (formRef && formRef.current) {
                formRef.current.click();
            }
        }
    }

    const handleSubmit = async (data: any) => {
        const newData = { ...formData, ...data };
        setFormData(newData);
        if (active === steps.length - 1) {
            try {
                await userHook.create(formData);
                nextStep();
                onComplete?.();
            } catch (error) { }
        }
        else {
            nextStep();
        }
    }


    return (
        <>
            <LoadingOverlay visible={userHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Group w='100%' justify='flex-end' mb={rem(12)}>
                <ActionIcon variant='transparent' onClick={onClose}>
                    <IconX />
                </ActionIcon>
            </Group>
            <Stepper
                active={active}
                size='xs'
                onStepClick={setActive}
                allowNextStepsSelect={false}
                px={rem(64)}
                completedIcon={<IconCircleCheck style={{ width: rem(18), height: rem(18) }} />}
                style={{ height: rem(480) }}>
                {
                    steps.map((step, index) => (
                        <Stepper.Step
                            key={index}
                            label={`Paso ${index + 1}`}
                            description={step.description}
                            icon={step.icon}>
                            <Group justify='center'>
                                <Box miw={rem(800)} pt={rem(32)} px='lg'>
                                    <step.step.form
                                        data={{ ...formData }}
                                        ref={formReferences.current[index]}
                                        onSubmit={handleSubmit}
                                        {...step.step.props} />
                                </Box>
                            </Group>
                        </Stepper.Step>
                    ))
                }
                <Stepper.Completed>
                    <Flex
                        justify="center"
                        align="center"
                        direction="column"
                        wrap="wrap"
                        c='green'
                    >
                        <IconCircleCheck style={{ width: rem(128), height: rem(128) }} />
                        <Text size='lg'>
                            El usuario ha sido creado
                        </Text>
                    </Flex>
                </Stepper.Completed>
            </Stepper>
            <Group justify="center" mt="lg">
                {
                    active < steps.length ?
                        <>
                            {
                                active !== 0 && <Button variant="default" onClick={prevStep}>Atras</Button>
                            }
                            {
                                active < steps.length - 1
                                    ? <Button onClick={handleNextChange}>Siguiente</Button>
                                    : <Button
                                        onClick={handleNextChange}
                                        leftSection={
                                            <IconDeviceFloppy
                                                style={{ width: rem(18), height: rem(18) }}
                                                stroke={1.5} />}>Guardar
                                    </Button>
                            }
                        </>
                        : <Button onClick={onClose}>Finalizar</Button>
                }
            </Group>
        </>
    );
}

export { UserCreateForm };