'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import { ActionIcon, Box, Divider, Flex, rem, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import ExtraLaboralActivitiesSchema, { DEFAULT_EXTRA_LABORAL_ACTIVITY, ExtraLaboralActivitiesSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/extra-laboral-activity.schema';

const MAX_JOB_ACTIVITY_LENGTH = 3

type FemoExtraLaboralActivityFormProps = {
    data?: Partial<ExtraLaboralActivitiesSchemaType>;
    onSubmit?: (value: ExtraLaboralActivitiesSchemaType) => void;
}
const FemoExtraLaboralActivityForm = React.forwardRef<HTMLFormElement, FemoExtraLaboralActivityFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, getInputProps, setValues, values: formValues } = useForm<ExtraLaboralActivitiesSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(ExtraLaboralActivitiesSchema)
    });

    const extraLaboralActivities = useMemo(() => formValues.extraLaboralActivities ?? [], [formValues])

    const handleSubmit = useCallback((value: ExtraLaboralActivitiesSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = () => setValues(prev => (prev.extraLaboralActivities?.length ?? 0) < MAX_JOB_ACTIVITY_LENGTH ? ({
        ...prev,
        extraLaboralActivities: [...(prev.extraLaboralActivities ?? []), DEFAULT_EXTRA_LABORAL_ACTIVITY]
    }) : prev);

    const handleRemove = (index: number) => setValues(prev => ({
        ...prev,
        extraLaboralActivities: [...(prev.extraLaboralActivities?.slice(0, index) ?? []), ...(prev.extraLaboralActivities?.slice(index + 1) ?? [])]
    }));

    return (
        <>
            <Title order={3}>Actividades Extra Laborales</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={formSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {extraLaboralActivities.length === 0 && (
                        <>
                            <Flex gap={rem(8)} direction="column">
                                <ActionIcon
                                    w="100%"
                                    variant='light'
                                    onClick={handleAdd}>
                                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                                <Text fs="italic" ta="center">No se han añadido actividades laborales extra</Text>
                            </Flex>
                        </>
                    )}
                    {extraLaboralActivities.map((e, i) => (
                        <Stack key={`root-${i}`} gap={rem(16)}>
                            <Flex gap={rem(8)}>
                                {extraLaboralActivities.length - 1 === i && extraLaboralActivities.length < MAX_JOB_ACTIVITY_LENGTH && (
                                    <ActionIcon
                                        w="100%"
                                        variant='light'
                                        onClick={handleAdd}>
                                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>)}
                                {extraLaboralActivities.length > 0 && i < MAX_JOB_ACTIVITY_LENGTH && (
                                    <ActionIcon variant='light'
                                        w="100%"
                                        onClick={() => handleRemove(i)}>
                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>)}
                            </Flex>
                            <Stack flex={1} style={{ minWidth: 0 }}>

                                <SimpleGrid cols={{ base: 1, md: 2 }}>
                                    <TextInput
                                        label='Tipo de Actividad'
                                        {...getInputProps(`extraLaboralActivities.${i}.description`)} />
                                    <DateInput
                                        placeholder="aaaa/mm/dd"
                                        label="Fecha"
                                        {...getInputProps(`extraLaboralActivities.${i}.date`)} />
                                </SimpleGrid>
                                {(extraLaboralActivities.length > 1 && i < extraLaboralActivities.length - 1) && <Divider />}
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Box >
        </>
    )
});

FemoExtraLaboralActivityForm.displayName = 'FemoExtraLaboralActivityForm';

export default FemoExtraLaboralActivityForm