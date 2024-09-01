'use client'

import { ModularBox } from '@/components/modular/box/ModularBox';
import { Button, Flex, LoadingOverlay, rem, Stepper, StepperCompleted, StepperStep, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconBuilding, IconChevronLeft, IconChevronRight, IconCircleCheck, IconDeviceFloppy, IconLicense, IconLock, IconUserCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createUser } from '../../../_actions/user.actions';
import { useDebounceCallback } from '@mantine/hooks';

interface UserFormProps {
    steps?: { description: string; icon: string }[];
    children: React.ReactNode[]
}

const icon: Record<string, any> = {
    'user-check': <IconUserCheck style={{ width: rem(16), height: rem(16) }} />,
    'lock': <IconLock style={{ width: rem(16), height: rem(16) }} />,
    'license': <IconLicense style={{ width: rem(16), height: rem(16) }} />,
    'building': <IconBuilding style={{ width: rem(16), height: rem(16) }} />,
}

const UserForm: React.FC<UserFormProps> = ({
    children,
    steps = []
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const [active, setActive] = useState<number>(0);
    const formRefs = useRef<Map<number, HTMLFormElement>>(new Map());
    const childrenCount = useMemo(() => React.Children.count(children), [children]);
    const router = useRouter();

    const [formValues, setFormValues] = useState<any>({});

    const nextStep = () => setActive(prev => prev < childrenCount ? prev + 1 : prev);
    const prevStep = () => setActive(prev => prev > 0 ? prev - 1 : prev);

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const currentValue: Record<string, string | number[]> = {};
        formData.forEach((value, key) => {
            let currentFormKey = key;
            if (key.split('-')[0] === 'resource') {
                if (!currentValue.resources) {
                    currentValue['resources'] = [];
                }
                currentValue['resources'] = [...(currentValue['resources'] as number[]), Number(key.split('-')[1])];
            } else {
                currentValue[currentFormKey] = value as string;
            }
        });

        if (active !== childrenCount - 1) {
            setFormValues((prev: any) => ({ ...prev, ...currentValue }));
            nextStep();
        } else {
            setFormValues((prev: any) => ({ ...prev, ...currentValue }));
            setShouldFetch(true);
        }
    }, [formValues, active, childrenCount]);

    const handleCreation = async (data: any) => {
        setLoading(true);
        try {
            await createUser(data);
            setActive(prev => prev + 1);
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    const handleNextChange = useDebounceCallback(() => {
        const formElement = formRefs.current.get(active);
        if (formElement) {
            // formElement.submit();
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formElement.dispatchEvent(submitEvent);
        }
    }, 500);

    useEffect(() => {
        if (shouldFetch) {
            handleCreation(formValues);
            setShouldFetch(false);
        }
    }, [shouldFetch, formValues]);

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
                    )}>
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
                                <Text size='lg'>El usuario ha sido creado</Text>
                            </Flex>
                        </ModularBox>
                    </StepperCompleted>
                </Stepper>
            </ModularBox>
            <ModularBox direction='row'>
                {active < childrenCount ?
                    (<>
                        {active !== 0 && <Button flex={1} size='xs' variant="default" onClick={prevStep} leftSection={<IconChevronLeft style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Atras</Button>}
                        {active < childrenCount - 1
                            ? (<Button flex={1} size='xs' onClick={handleNextChange} rightSection={<IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Siguiente</Button>)
                            : (<Button flex={1} size='xs' onClick={handleNextChange} leftSection={<IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Guardar</Button>)}
                    </>
                    ) : (
                        <Button flex={1} size='xs' onClick={() => router.push('../')}>Finalizar</Button>
                    )}
            </ModularBox>
        </>
    )
}

export default UserForm