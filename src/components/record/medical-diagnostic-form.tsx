'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import MedicalDiagnosticSchema from './schemas/medical-diagnostic.schema'
import { z } from 'zod';
import { Button, ButtonGroup, Checkbox, Divider, Grid, GridCol, Group, rem, Stack, Textarea, TextInput } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';

const defaultMedicalDiagnostic = {
    description: '',
    cie: '',
    pre: false,
    def: false,
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
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={rem(32)}>
                {form.values.diagnostics.map((e, i) =>
                    <>
                        <Group key={i} component='div' w='100%'>
                            <ButtonGroup>
                                {form.values.diagnostics.length - 1 === i && <Button
                                    variant='white'
                                    onClick={handleAdd}>
                                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                </Button>}
                                {form.values.diagnostics.length > 1
                                    && <Button variant='white'
                                        onClick={() => handleRemove(i)}>
                                        <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                    </Button>}
                            </ButtonGroup>
                            <Grid flex={1}>
                                <GridCol span={{ base: 12, md: 6 }} component='div'>
                                    <TextInput
                                        label="DESCRIPCION"
                                        {...form.getInputProps(`diagnostics.${i}.description`)} />
                                </GridCol>
                                <GridCol span={{ base: 6, md: 3 }} component='div'>
                                    <DateInput
                                        label='CIE'
                                        {...form.getInputProps(`diagnostics.${i}.cie`)} />
                                </GridCol>
                                <GridCol span={{ base: 6, md: 3 }} component='div'>
                                    <Stack justify='center' align='center'>
                                        <Checkbox
                                            label="PRE"
                                            labelPosition='left'
                                            {...form.getInputProps(`diagnostics.${i}.pre`)} />
                                        <Checkbox
                                            label="DEF"
                                            labelPosition='left'
                                            {...form.getInputProps(`diagnostics.${i}.def`)} />
                                    </Stack>
                                </GridCol>
                            </Grid>
                        </Group>
                        {form.values.diagnostics.length > 1 && <Divider />}
                    </>
                )}
            </Stack>
        </form >
    )
});

MedicalDiagnosticForm.displayName = 'MedicalDiagnosticForm';

export default MedicalDiagnosticForm