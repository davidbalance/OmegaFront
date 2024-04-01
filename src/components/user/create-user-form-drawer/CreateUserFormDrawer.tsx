import { AccessControlService, CreateCredentialRQ, CreateUserRQ, ICreateService, UserCrendentialService, UserService } from '@/services';
import endpoints from '@/services/endpoints/endpoints';
import { Drawer, Stepper, rem, Flex, Group, Button, Text, DrawerProps, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCircleCheck, IconDeviceFloppy } from '@tabler/icons-react';
import React, { RefObject, useEffect, useRef, useState } from 'react'

const userService: ICreateService<CreateUserRQ, number> = new UserService(endpoints.USER.V1);
const credentialService: ICreateService<CreateCredentialRQ, void> = new UserCrendentialService(endpoints.CREDENTIAL.V1);
const accessControlService = new AccessControlService(endpoints.ACCESS_CONTROL.V1);

export type UserStepProps = {
    description: string; icon: React.ReactNode; step: {
        form: React.ElementType,
        props: any
    }
}
type CreateUserFormDrawerProps = DrawerProps & {
    steps: UserStepProps[];
    onComplete?: () => void;
}
const CreateUserFormDrawer: React.FC<CreateUserFormDrawerProps> = ({ steps, onComplete, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const [active, setActive] = useState(0);
    const [formData, setFormData] = useState<any>({});

    const formReferences = useRef<RefObject<HTMLButtonElement>[]>([]);
    if (formReferences.current.length < steps.length) {
        formReferences.current = steps.map(() => React.createRef<HTMLButtonElement>());
    }

    useEffect(() => {
        setActive(0);
        return () => { }
    }, [props.opened]);

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

    const createUser = async (data: any) => {
        LoadDisclosure.open();
        try {
            const user = await userService.create(data);
            const newData = { ...data, user };
            console.log(1, newData)
            await credentialService.create(newData);
            console.log(2, newData)
            await accessControlService.findOneAndUpdateRoles(newData);
            nextStep();
            onComplete?.();
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Error',
                message: 'Ha ocurrido un error al crear el usuario',
                color: 'red'
            })
        } finally {
            LoadDisclosure.close();
        }
    }

    const handleSubmit = async (data: any) => {
        const newData = { ...formData, ...data };
        setFormData(newData);
        if (active === steps.length - 1) createUser(newData) 
        else nextStep();
    }

    return (
        <Drawer
            position='right'
            title="Formulario de usuario"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'
            {...props}>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <Stepper
                active={active}
                size='xs'
                onStepClick={setActive}
                allowNextStepsSelect={false}
                completedIcon={<IconCircleCheck style={{ width: rem(18), height: rem(18) }} />}
                style={{ height: rem(480) }}
            >
                {
                    steps.map((step, index) => (
                        <Stepper.Step key={index} label={`Paso ${index + 1}`} description={step.description} icon={step.icon}>
                            <step.step.form
                                data={{ ...formData }}
                                ref={formReferences.current[index]}
                                onSubmit={handleSubmit}
                                {...step.step.props} />
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

            <Group justify="center" mt="xl">
                {
                    active < steps.length ?
                        <>
                            <Button variant="default" onClick={prevStep}>Atras</Button>
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
                        : <Button onClick={props.onClose}>Finalizar</Button>
                }
            </Group>
        </Drawer>
    );
}

export default CreateUserFormDrawer