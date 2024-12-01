'use client'

import React, { useCallback, useMemo } from 'react'
import medicalOrderLaboratorySchema from '../_schema/medical-order-laboratory.schema'
import { joiResolver, useForm } from '@mantine/form';
import { Box, Button, Select, Stack } from '@mantine/core';
import { ExamTypeOption } from '@/lib/dtos/laboratory/exam/type/base.response.dto';
import { LaboratoryValue, useMedicalOrderLaboratory } from '../_context/medical-order-laboratory.context';

type MedicalOrderLaboratoryFormProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref'> & {
    options: ExamTypeOption[];
};
const MedicalOrderLaboratoryForm: React.FC<MedicalOrderLaboratoryFormProps> = ({ options }) => {

    const form = useForm({
        initialValues: { examType: null, examSubtype: null, examName: null },
        validate: joiResolver(medicalOrderLaboratorySchema)
    });

    const { add } = useMedicalOrderLaboratory();

    const subtypes = useMemo(() => options.find(e => e.name === form.values.examType)?.subtypes || [], [options, form.values.examType]);
    const exams = useMemo(() => subtypes.find(e => e.name === form.values.examSubtype)?.exams || [], [subtypes, form.values.examSubtype]);

    const handleSubmit = useCallback(({ examName, examSubtype, examType }: { examName: string | null, examSubtype: string | null, examType: string | null }) => {
        if (!!examName && !!examSubtype && !!examType) {
            add({ examName, examSubtype, examType });
            form.reset();
        }
    }, [form, add]);

    return (
        <Box component='form'
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Select
                    data={options.map(e => ({ value: e.name, label: e.name }))}
                    label="Tipo de examen"
                    placeholder="Escoge un tipo de examen"
                    nothingFoundMessage="Tipo de examen no encontrado..."
                    checkIconPosition="left"
                    defaultDropdownOpened={false}
                    clearable
                    maxDropdownHeight={200}
                    name='examType'
                    {...form.getInputProps('examType')} />

                <Select
                    data={subtypes.map(e => ({ value: e.name, label: e.name }))}
                    label="Subtipo de examen"
                    placeholder="Escoge a un subtipo de examen medico"
                    nothingFoundMessage="Subtipo de examen medico no encontrado..."
                    checkIconPosition="left"
                    defaultDropdownOpened={false}
                    clearable
                    maxDropdownHeight={200}
                    name='examSubtype'
                    {...form.getInputProps('examSubtype')} />

                <Select
                    data={exams.map(e => ({ value: e.name, label: e.name }))}
                    label="Examen"
                    placeholder="Escoge a un examen"
                    nothingFoundMessage="Examen no encontrado..."
                    checkIconPosition="left"
                    defaultDropdownOpened={false}
                    clearable
                    maxDropdownHeight={200}
                    name='examName'
                    {...form.getInputProps('examName')} />

                <Button type='submit'>
                    Agregar
                </Button>
            </Stack>
        </Box>
    )
}

export default MedicalOrderLaboratoryForm