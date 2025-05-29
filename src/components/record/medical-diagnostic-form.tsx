'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import MedicalDiagnosticSchema from './schemas/medical-diagnostic.schema'
import { z } from 'zod';
import { ActionIcon, Box, Divider, Grid, GridCol, Group, Radio, RadioGroup, rem, Stack, TextInput, Title } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

const defaultMedicalDiagnostic = {
    description: '',
    cie: '',
    flag: 'pre'
}

type MedicalDiagnosticFormProps = {
    data?: Partial<z.infer<typeof MedicalDiagnosticSchema>>;
    onSubmit?: (value: z.infer<typeof MedicalDiagnosticSchema>) => void;
}
const MedicalDiagnosticForm = React.forwardRef<HTMLFormElement, MedicalDiagnosticFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof MedicalDiagnosticSchema>>({
        initialValues: {
            diagnostics: data?.diagnostics ?? [defaultMedicalDiagnostic],
        },
        validate: zodResolver(MedicalDiagnosticSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof MedicalDiagnosticSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAdd = useCallback(() => {
        form.setValues(prev => ({ ...prev, diagnostics: [...(prev.diagnostics ?? []), defaultMedicalDiagnostic] }));
    }, [form]);

    const handleRemove = useCallback((index: number) => {
        form.setValues(prev => ({ ...prev, diagnostics: [...(prev.diagnostics?.slice(0, index) ?? []), ...(prev.diagnostics?.slice(index + 1) ?? [])] }));
    }, [form]);

    return (
        <>
            <Title order={3}>Diagnostico</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(32)}>
                    {form.values.diagnostics.map((e, i) =>
                        <Stack key={i}>
                            <Group component='div' w='100%'>
                                <Stack>
                                    {form.values.diagnostics.length - 1 === i && <ActionIcon
                                        variant='light'
                                        onClick={handleAdd}>
                                        <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>}
                                    {form.values.diagnostics.length > 1
                                        && <ActionIcon variant='light'
                                            onClick={() => handleRemove(i)}>
                                            <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>}
                                </Stack>
                                <Grid flex={1}>
                                    <GridCol span={{ base: 12, md: 6 }} component='div'>
                                        <TextInput
                                            label="DESCRIPCION"
                                            {...form.getInputProps(`diagnostics.${i}.description`)} />
                                    </GridCol>
                                    <GridCol span={{ base: 6, md: 3 }} component='div'>
                                        <TextInput
                                            label='CIE'
                                            {...form.getInputProps(`diagnostics.${i}.cie`)} />
                                    </GridCol>
                                    <GridCol span={{ base: 6, md: 3 }} component='div'>
                                        <RadioGroup
                                            {...form.getInputProps(`diagnostics.${i}.flag`)}>
                                            <Stack
                                                justify='center'
                                                align='center'>
                                                <Radio
                                                    label="PRE"
                                                    value="pre" />
                                                <Radio
                                                    label="DEF"
                                                    value="def" />
                                            </Stack>
                                        </RadioGroup>
                                    </GridCol>
                                </Grid>
                            </Group>
                            {form.values.diagnostics.length > 1 && <Divider />}
                        </Stack>
                    )}
                </Stack>
            </Box>
        </>
    )
});

MedicalDiagnosticForm.displayName = 'MedicalDiagnosticForm';

export default MedicalDiagnosticForm