'use client'

import { Box, Button, ButtonGroup, Flex, LoadingOverlay, rem, ScrollArea, Stack, Stepper, StepperCompleted, StepperStep, Text } from '@mantine/core';
import { useDebounceCallback } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconBook, IconCheck, IconChevronLeft, IconChevronRight, IconCircleCheck, IconImageInPicture } from '@tabler/icons-react';
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { ModularBox } from './modular/box/ModularBox';
import { getErrorMessage } from '@/lib/utils/errors';

export type StepperIcon = Record<string, React.ReactElement>
export type StepSubmitEvent<T = any> = (value: Partial<T>) => void;
type StepperHeader = { title?: string; description?: string; icon: string; }
type ButtonLabel = {
    next: string;
    prev: string;
    submit: string;
    finish: string;
};

type StepperFormProps<T = any> = {
    children: React.ReactNode[];
    onSubmit: (data: T) => Promise<void>;
    onNextStep?: (data: Partial<T>) => Promise<void>;
    onFinish?: () => void;
    defaultIcon?: React.ReactElement;
    icon?: StepperIcon;
    defaultHeaderDescription?: string;
    headers?: StepperHeader[];
    buttonLabels?: Partial<ButtonLabel>;
    endMessage?: string;
    initialData?: Partial<T>;
    orientation?: 'vertical' | 'horizontal'
}
const StepperForm = <T,>({
    children,
    onSubmit,
    onNextStep,
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
    orientation = 'horizontal'
}: StepperFormProps<T>) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [active, setActive] = useState<number>(0);
    const [formValues, setFormValues] = useState<Partial<T>>(initialData);
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
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [onSubmit]);

    const handleStepSubmit: StepSubmitEvent<T> = useCallback(
        async (value) => {
            if (active !== childrenCount - 1) {
                const newValues = { ...formValues, ...value };
                setFormValues(newValues);
                onNextStep?.(newValues);
                nextStep();
            } else {
                const newValues = { ...formValues, ...value };
                setFormValues(newValues);
                handleSubmit(newValues as T);
            }
        }, [active, formValues, nextStep, childrenCount, handleSubmit, onNextStep]);

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
            <ModularBox
                flex={1}>
                <Box w='100%' h='100%' pos='relative'>
                    <Stepper
                        active={active}
                        size="xs"
                        onStepClick={setActive}
                        allowNextStepsSelect={false}
                        h="100%"
                        completedIcon={<IconCircleCheck style={{ width: rem(16), height: rem(16) }} />}
                        styles={{
                            root: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: orientation === 'horizontal' ? 'column' : 'row-reverse' },
                            steps: orientation === 'horizontal' ? undefined : { overflowY: 'auto', height: 'auto', paddingRight: rem(8), paddingLeft: rem(8), paddingTop: rem(16) },
                            content: { flex: 1, height: '100%' }
                        }}
                        iconSize={32}
                        orientation={orientation}
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

                            const title = headers[index]?.title ?? `Paso ${index + 1}`;
                            const description = headers[index]?.description ?? defaultHeaderDescription;
                            return (
                                <StepperStep key={index} icon={stepIcon} label={title} description={description}>
                                    <Box component='div' h='100%' pos='relative'>
                                        <ScrollArea
                                            scrollbars='y'
                                            component='div'
                                            px={rem(16)}
                                            style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                                            {newChild}
                                        </ScrollArea>
                                    </Box>
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
                </Box>
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