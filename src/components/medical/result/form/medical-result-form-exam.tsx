'use client'

import { Exam } from '@/lib/dtos/laboratory/exam/base.response.dto';
import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto';
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto';
import { Box, Button, ComboboxItem, rem, Select } from '@mantine/core';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

const CustomSelect = ({ onChange, ...props }: {
    value: string | null;
    data: { label: string, value: string }[];
    nothingFoundMessage: string;
    label: string;
    placeholder: string;
    name: string;
    onChange: (option: ComboboxItem) => void;
}) => {
    return (
        <Select
            checkIconPosition="left"
            pb={rem(16)}
            searchable
            defaultDropdownOpened={false}
            allowDeselect={false}
            maxDropdownHeight={200}
            onChange={(_, value) => onChange(value)}
            {...props}
        />
    );
}

interface MedicalResultFormExamProps {
    options: ExamType[]
    value?: {
        examType: string;
        examSubtype: string;
        examName: string;
    },
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const MedicalResultFormExam = React.forwardRef<HTMLFormElement, MedicalResultFormExamProps>(({
    value,
    options,
    onSubmit
}, ref) => {

    const [type, setType] = useState<ExamType | null>(null);
    const [subtype, setSubtype] = useState<ExamSubtype | null>(null);
    const [exam, setExam] = useState<Exam | null>(null);

    const handleSelectTypeChange = useCallback((value: ComboboxItem) => {
        setType(options.find(e => e.name === value.value) || null);
        setSubtype(null);
        setExam(null);
    }, [options]);

    const handleSelectSubtypeChange = useCallback((value: ComboboxItem) => {
        setSubtype(type?.subtypes.find(e => e.name === value.value) || null);
        setExam(null);
    }, [type]);

    const handleSelectExamChange = useCallback((value: ComboboxItem) => {
        setExam(subtype?.exams.find(e => e.name === value.value) || null);
    }, [subtype]);

    const typeOptions = useMemo(() => options?.map((e) => ({ value: e.name, label: e.name })) || [], [options]);
    const subtypeOptions = useMemo(() => type?.subtypes?.map((e) => ({ value: e.name, label: e.name })) || [], [type]);
    const examOptions = useMemo(() => subtype?.exams?.map((e) => ({ value: e.name, label: e.name })) || [], [subtype]);

    useEffect(() => {
        if (value) {
            const currentType = options.find(e => e.name === value.examType) || null;
            if (currentType) {
                setType(currentType);
                const currentSubtype = currentType.subtypes.find(e => e.name === value.examSubtype) || null;
                if (currentSubtype) {
                    setSubtype(currentSubtype);
                    setExam(currentSubtype.exams.find(e => e.name === value.examName) || null);
                }
            }
        }
    }, [value, options]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={onSubmit}>

            <CustomSelect
                name='examType'
                value={type?.name || null}
                data={typeOptions}
                onChange={handleSelectTypeChange}
                label="Tipos de examenes"
                placeholder="Escoge un tipo de examen"
                nothingFoundMessage="Tipo de examen no encontrado" />

            <CustomSelect
                name='examSubtype'
                value={subtype?.name || null}
                data={subtypeOptions}
                onChange={handleSelectSubtypeChange}
                label="Subtipos de examenes"
                placeholder="Escoge un subtipo de examen"
                nothingFoundMessage="Subtipo de examen no encontrado" />

            <CustomSelect
                name='examName'
                value={exam?.name || null}
                data={examOptions}
                onChange={handleSelectExamChange}
                label="Examenes"
                placeholder="Escoge un examen"
                nothingFoundMessage="Examen no encontrado" />

            <Button
                type='submit'
                style={{ display: 'none' }} />

        </Box>
    )
});

export default MedicalResultFormExam;