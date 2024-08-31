'use client'

import { ModularBox } from '@/components/modular/box/ModularBox';
import { Button, Flex, rem, Stepper, StepperCompleted, StepperStep, Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconCircleCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useMemo, useRef, useState } from 'react'

interface UserFormProps {
    children: React.ReactNode[]
}

const UserForm: React.FC<UserFormProps> = ({ children }) => {

    const [active, setActive] = useState<number>(0);
    const formRefs = useRef<Map<number, HTMLFormElement>>(new Map());
    const childrenCount = useMemo(() => React.Children.count(children), [children]);
    const router = useRouter();

    const [formValues, setFormValues] = useState<any>({});

    const nextStep = () => setActive(prev => prev < childrenCount ? prev + 1 : prev);
    const prevStep = () => setActive(prev => prev > 0 ? prev - 1 : prev);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
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
            setFormValues((prev: any) => {
                return { ...prev, ...currentValue };
            });
            setActive(prev => prev + 1);
        }
    }, [active, childrenCount]);

    const handleNextChange = () => {
        const formElement = formRefs.current.get(active);
        if (formElement) {
            // formElement.submit();
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formElement.dispatchEvent(submitEvent);
        }
    }

    return (
        <>
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
                        return (
                            <StepperStep key={Math.random()}>
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