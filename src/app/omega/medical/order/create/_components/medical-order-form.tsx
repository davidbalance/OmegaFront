'use client'

import { ModularBox } from '@/components/modular/box/ModularBox';
import { createMedicalOrder } from '@/server/medical-order.actions';
import { Button, ButtonGroup, Flex, LoadingOverlay, rem, Stepper, StepperCompleted, StepperStep, Text } from '@mantine/core';
import { useDebounceCallback } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconBuilding, IconChevronLeft, IconChevronRight, IconCircleCheck, IconDeviceFloppy, IconMedicineSyrup, IconStethoscope } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface MedicalOrderFormProps {
    patient: string;
    steps?: { description: string; icon: string }[];
    children: React.ReactNode[];
}

const icon: Record<string, any> = {
    'doctor': <IconStethoscope style={{ width: rem(16), height: rem(16) }} />,
    'building': <IconBuilding style={{ width: rem(16), height: rem(16) }} />,
    'exam': <IconMedicineSyrup style={{ width: rem(16), height: rem(16) }} />,
}

const MedicalOrderForm: React.FC<MedicalOrderFormProps> = ({
    children,
    patient,
    steps = []
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const [active, setActive] = useState<number>(0);
    const formRefs = useRef<Map<number, HTMLFormElement>>(new Map());
    const childrenCount = useMemo(() => React.Children.count(children), [children]);
    const router = useRouter();

    const [formValues, setFormValues] = useState<any>({});

    const nextStep = useCallback(() => setActive(prev => prev < childrenCount ? prev + 1 : prev), [childrenCount]);
    const prevStep = () => setActive(prev => prev > 0 ? prev - 1 : prev);

    const handleSubmit = useCallback(async (event: any) => {
        if (active !== childrenCount - 1) {
            setFormValues((prev: any) => ({ ...prev, ...event }));
            nextStep();
        } else {
            setFormValues((prev: any) => ({ ...prev, ...event }));
            setShouldFetch(true);
        }
    }, [active, nextStep, childrenCount]);

    const handleCreation = useCallback(async (data: any) => {
        setLoading(true);
        try {
            await createMedicalOrder({ ...data, patientDni: patient });
            setActive(prev => prev + 1);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [patient]);

    const handleNextChange = useDebounceCallback(() => {
        const formElement = formRefs.current.get(active);
        if (formElement) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formElement.dispatchEvent(submitEvent);
        }
    }, 500);

    useEffect(() => {
        if (shouldFetch) {
            handleCreation(formValues);
            setShouldFetch(false);
        }
    }, [shouldFetch, formValues, handleCreation]);

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <ModularBox flex={1}>
                <Stepper
                    active={active}
                    size='xs'
                    onStepClick={setActive}
                    allowNextStepsSelect={false}
                    h='100%'
                    completedIcon={(
                        <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                    )}
                    styles={{
                        content: { height: '90%' }
                    }}>
                    {React.Children.map(children, (child, index) => {
                        let newChild = child;
                        if (React.isValidElement(child)) {
                            const formRef = (node: HTMLFormElement) => {
                                if (node) {
                                    formRefs.current.set(index, node);
                                }
                            }
                            newChild = React.cloneElement(child as React.ReactElement<HTMLFormElement>, {
                                data: { ...formValues },
                                ref: formRef,
                                onSubmit: handleSubmit,
                            });
                        }
                        let stepperProps: any = { icon: 'user-check', description: undefined };
                        if (steps[index]) {
                            stepperProps = steps[index];
                            if (!icon[stepperProps.icon]) {
                                stepperProps.icon = 'user-check';
                            }
                        }
                        const { icon: choosenIcon, description } = stepperProps;
                        return (
                            <StepperStep
                                key={Math.random()}
                                icon={icon[choosenIcon]}
                                label={`Paso ${index + 1}`}
                                description={description}>
                                {newChild}
                            </StepperStep>
                        );
                    })}
                    <StepperCompleted>
                        <ModularBox>
                            <Flex justify="center" align="center" direction="column" wrap="wrap" c='green'>
                                <IconCircleCheck style={{ width: rem(128), height: rem(128) }} />
                                <Text size='lg'>La orden medica ha sido creada</Text>
                            </Flex>
                        </ModularBox>
                    </StepperCompleted>
                </Stepper>
            </ModularBox>
            <ModularBox>
                <ButtonGroup>
                    {active < childrenCount ?
                        (<>
                            {active !== 0 && (<Button
                                flex={1}
                                size='xs'
                                variant="default"
                                onClick={prevStep}
                                leftSection={(
                                    <IconChevronLeft
                                        style={{ width: rem(16), height: rem(16) }}
                                        stroke={1.5}
                                    />)}>
                                Atras
                            </Button>)}
                            {active < childrenCount - 1
                                ? (<Button
                                    flex={1}
                                    size='xs'
                                    onClick={handleNextChange}
                                    rightSection={(
                                        <IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    )}>
                                    Siguiente
                                </Button>)
                                : (<Button
                                    flex={1}
                                    size='xs'
                                    onClick={handleNextChange}
                                    leftSection={(
                                        <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    )}>
                                    Guardar
                                </Button>)}
                        </>
                        ) : (
                            <Button flex={1} size='xs' onClick={() => router.back()}>Finalizar</Button>
                        )}
                </ButtonGroup>
            </ModularBox>
        </>
    )
}

export default MedicalOrderForm