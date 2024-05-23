import { ActionIcon, Box, Button, Flex, Group, LoadingOverlay, Stepper, rem } from '@mantine/core'
import React, { useRef, useState } from 'react'
import { IconCircleCheck, IconDeviceFloppy, IconLicense, IconUserCheck, IconX } from '@tabler/icons-react'
import { RoleForm } from '../role-form/RoleForm'
import { useRole } from '@/hooks'
import { AssignResourceForm } from '@/components/resources/assign-resource'
import { useResource } from '@/hooks/useResources'
import { Role } from '@/lib/types/role'

type RoleStepProps = {
    description: string; icon: React.ReactNode; step: {
        form: React.ElementType,
        props: any
    }
}

type UpdateRoleFormDrawerProps = {
    role: Role,
    onClose: () => void;
    onComplete?: () => void;
}
const UpdateRoleFormDrawer: React.FC<UpdateRoleFormDrawerProps> = ({ role, onClose, onComplete }) => {

    const roleHook = useRole(true);
    const resourceHook = useResource(true);

    const [active, setActive] = useState(0);
    const [formData, setFormData] = useState<any>({});

    const steps: RoleStepProps[] = [
        {
            description: 'Nombre del Rol',
            icon: <IconUserCheck style={{ width: rem(18), height: rem(18) }} />,
            step: { form: RoleForm, props: { data: role } }
        },
        {
            description: 'Asignacion de roles',
            icon: <IconLicense style={{ width: rem(18), height: rem(18) }} />,
            step: {
                form: AssignResourceForm,
                props: {
                    resources: resourceHook.resources,
                    data: { resources: role.resources }
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
                await roleHook.update(newData);
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
            <LoadingOverlay visible={roleHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
                style={{ height: rem(450) }}>
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
                        Rol creado
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

export default UpdateRoleFormDrawer