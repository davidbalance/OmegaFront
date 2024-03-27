import { Drawer, Stepper, rem, Flex, Group, Button, Text } from '@mantine/core';
import { IconCircleCheck, IconDeviceFloppy } from '@tabler/icons-react';
import React, { RefObject, useEffect, useRef, useState } from 'react'

export type UserStepProps = {
    description: string; icon: React.ReactNode; step: {
        form: React.ElementType,
        props: any
    }
}
type CreateUserFormDrawerProps = { opened: boolean; close: () => void; steps: UserStepProps[] }
const CreateUserFormDrawer: React.FC<CreateUserFormDrawerProps> = ({ opened, close, steps }) => {

    const [active, setActive] = useState(0);
    const [formData, setFormData] = useState<any>({});

    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    useEffect(() => {
        setActive(0);
        return () => { }
    }, [opened])


    const formReferences = useRef<RefObject<HTMLButtonElement>[]>([]);

    if (formReferences.current.length < steps.length) {
        formReferences.current = steps.map(() => React.createRef<HTMLButtonElement>());
    }

    const handleNextChange = () => {
        if (active < steps.length) {
            const formRef = formReferences.current[active];
            if (formRef && formRef.current) {
                formRef.current.click();
            }
        }
    }

    const handleSubmit = (data: any) => {
        console.log({ ...formData, ...data });
        setFormData({ ...formData, ...data });
        nextStep();
    }

    return (
        <Drawer
            opened={opened}
            onClose={close}
            position='right'
            title="Formulario de usuario"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'>
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
                        : <Button onClick={close}>Finalizar</Button>
                }
            </Group>
        </Drawer>
    );
}

export default CreateUserFormDrawer