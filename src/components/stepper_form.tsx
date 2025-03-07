'use client'

import { Button, ButtonGroup, Flex, LoadingOverlay, rem, Stepper, StepperCompleted, StepperStep, Text } from '@mantine/core';
import { useDebounceCallback } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconBook, IconCheck, IconChevronLeft, IconChevronRight, IconCircleCheck, IconImageInPicture } from '@tabler/icons-react';
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { ModularBox } from './modular/box/ModularBox';

export type StepperIcon = Record<string, React.ReactElement>
export type StepSubmitEvent<T = any> = (value: Partial<T>) => void;
type StepperHeader = { description: string; icon: string; }
type ButtonLabel = {
    next: string;
    prev: string;
    submit: string;
    finish: string;
};

type StepperFormProps<T = any> = {
    children: React.ReactNode[];
    onSubmit: (data: T) => Promise<void>;
    onFinish?: () => void;
    defaultIcon?: React.ReactElement;
    icon?: StepperIcon;
    defaultHeaderDescription?: string;
    headers?: StepperHeader[];
    buttonLabels?: Partial<ButtonLabel>;
    endMessage?: string;
    initialData?: T;
}
const StepperForm = <T,>({
    children,
    onSubmit,
    onFinish,
    defaultIcon = <IconBook style={{ width: rem(16), height: rem(16) }} />,
    icon = {},
    defaultHeaderDescription = '',
    headers = [],
    buttonLabels = {
        next: 'Siguiente',
        prev: 'Atrás',
        submit: 'Guardar',
        finish: 'Finalizar',
    },
    endMessage = 'Proceso completado',
    initialData = {} as T,
}: StepperFormProps<T>) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [active, setActive] = useState<number>(0);
    const [formValues, setFormValues] = useState<T>(initialData);
    const formRefs = useRef<Map<number, HTMLFormElement>>(new Map());
    const childrenCount = useMemo(() => React.Children.count(children), [children]);

    const nextStep = useCallback(() => setActive(prev => (prev < childrenCount ? prev + 1 : prev)), [childrenCount]);
    const prevStep = () => setActive((prev) => (prev > 0 ? prev - 1 : prev));

    const handleSubmit = useCallback(
        async (value: T) => {
            setLoading(true);
            try {
                await onSubmit(value);
                setActive((prev) => prev + 1);
            } catch (error: any) {
                notifications.show({ message: error.message, color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [onSubmit]);

    const handleStepSubmit: StepSubmitEvent<T> = useCallback(
        async (value) => {
            if (active !== childrenCount - 1) {
                setFormValues((prev) => ({ ...prev, ...value }));
                nextStep();
            } else {
                const newValues = { ...formValues, ...value };
                setFormValues(newValues);
                handleSubmit(newValues);
                // setFormValues((prev) => ({ ...prev, ...value }));
                // setShouldFetch(true);
            }
        }, [active, formValues, nextStep, childrenCount, handleSubmit]);

    const handleNextChange = useDebounceCallback(() => {
        const formElement = formRefs.current.get(active);
        if (formElement) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formElement.dispatchEvent(submitEvent);
        }
    }, 300);

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            <ModularBox flex={1}>
                <Stepper
                    active={active}
                    size="xs"
                    onStepClick={setActive}
                    allowNextStepsSelect={false}
                    h="100%"
                    completedIcon={<IconCircleCheck style={{ width: rem(16), height: rem(16) }} />}
                    styles={{ content: { height: '90%' } }}
                >
                    {React.Children.map(children, (child, index) => {
                        let newChild = child;
                        if (React.isValidElement(child)) {
                            const formRef = (node: HTMLFormElement) => {
                                if (node) {
                                    formRefs.current.set(index, node);
                                }
                            };
                            newChild = React.cloneElement(child as React.ReactElement<HTMLFormElement>, {
                                data: { ...formValues },
                                ref: formRef,
                                onSubmit: handleStepSubmit,
                            });
                        }

                        const stepperProps = headers[index] ?? { description: defaultHeaderDescription, icon: null };
                        const stepIcon = stepperProps.icon !== null ? icon[stepperProps.icon] ?? defaultIcon : defaultIcon;

                        return (
                            <StepperStep key={index} icon={stepIcon} label={`Paso ${index + 1}`} description={stepperProps.description}>
                                {newChild}
                            </StepperStep>
                        );
                    })}
                    <StepperCompleted>
                        <ModularBox>
                            <Flex
                                component='div'
                                justify="center"
                                align="center"
                                direction="column"
                                wrap="wrap"
                                c="green">
                                <IconCircleCheck style={{ width: rem(128), height: rem(128) }} />
                                <Text size="lg">
                                    {endMessage}
                                </Text>
                            </Flex>
                        </ModularBox>
                    </StepperCompleted>
                </Stepper>
            </ModularBox>
            <ModularBox>
                <ButtonGroup>
                    {active < childrenCount ? (
                        <>
                            {active !== 0 && (
                                <Button
                                    flex={1}
                                    size="xs"
                                    variant="default"
                                    onClick={prevStep}
                                    leftSection={<IconChevronLeft style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                                    {buttonLabels.prev}
                                </Button>
                            )}
                            {active < childrenCount - 1 ? (
                                <Button flex={1} size="xs" onClick={handleNextChange} rightSection={<IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                                    {buttonLabels.next}
                                </Button>
                            ) : (
                                <Button flex={1} size="xs" onClick={handleNextChange} leftSection={<IconCheck style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                                    {buttonLabels.submit}
                                </Button>
                            )}
                        </>
                    ) : (
                        <Button flex={1} size="xs" onClick={onFinish}>
                            {buttonLabels.finish}
                        </Button>
                    )}
                </ButtonGroup>
            </ModularBox>
        </>
    )
}

export default StepperForm;