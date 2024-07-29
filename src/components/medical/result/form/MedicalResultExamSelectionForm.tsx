import { Exam } from '@/lib/dtos/laboratory/exam/base.response.dto';
import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto';
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto';
import { BaseFormProps } from '@/lib/types/base-form-prop';
import { Box, Button, rem, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

interface ExamForm {
    examType: string;
    examSubtype: string;
    examName: string;
}

interface MedicalResultExamSelectionFormProps extends BaseFormProps<ExamForm> {
    types: ExamType[]
}

const MedicalResultExamSelectionForm = React.forwardRef<HTMLButtonElement, MedicalResultExamSelectionFormProps>(({ formData, types, onFormSubmitted }, ref) => {

    const [subtypes, setSubtypes] = useState<ExamSubtype[]>([]);
    const [exam, setExam] = useState<Exam[]>([]);

    const [selectedType, setSelectedType] = useState<string | null>(formData?.examType || null);
    const [selectedSubtype, setSelectedSubype] = useState<string | null>(formData?.examSubtype || null);
    const [selectedExam, setSelectedExam] = useState<string | null>(formData?.examName || null);

    const typeOptions = useMemo(() => types?.map((e) => e.name) || [], [types]);
    const subtypeOptions = useMemo(() => subtypes?.map((e) => e.name) || [], [subtypes]);
    const examOptions = useMemo(() => exam?.map((e) => e.name) || [], [exam]);

    const handleSelectTypeChange = useCallback((value: string | null) => {
        if (value) {
            const currentType = types.find((e) => e.name === value);
            setSubtypes(currentType?.subtypes || []);
        } else {
            setSubtypes([]);
        }
        setSelectedType(value);
        setSelectedSubype(null);
        setSelectedExam(null);
        setExam([]);
    }, [types]);

    const handleSelectSubtypeChange = useCallback((value: string | null) => {
        if (value) {
            const currentsubtype = subtypes.find((e) => e.name === value);
            setExam(currentsubtype?.exams || []);
        } else {
            setExam([]);
        }
        setSelectedSubype(value)
        setSelectedExam(null)
    }, [subtypes]);

    const handleSelectExamChange = useCallback((value: string | null) => {
        setSelectedExam(value)
    }, []);

    const handleFormSubmittionEvent = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedType || !selectedSubtype || !selectedExam) {
            notifications.show({ message: 'No debe seleccionar todos los campos' });
            return;
        }
        onFormSubmitted?.({
            examType: selectedType,
            examSubtype: selectedSubtype,
            examName: selectedExam,
        });
    }, [onFormSubmitted, selectedType, selectedSubtype, selectedExam]);

    useEffect(() => {
        if (formData) {
            const currentType = types.find(e => e.name === formData.examType);
            const initialSubtypes = currentType?.subtypes;
            const currentSubtype = initialSubtypes?.find(e => e.name === formData.examSubtype);
            setSubtypes(initialSubtypes || []);
            setExam(currentSubtype?.exams || []);
        }
    }, [formData, types]);


    return (
        <Box
            component='form'
            onSubmit={handleFormSubmittionEvent}
        >
            <Select
                value={selectedType}
                data={typeOptions}
                checkIconPosition="left"
                onChange={handleSelectTypeChange}
                label="Tipos de examenes"
                pb={rem(16)}
                placeholder="Escoge un tipo de examen"
                searchable
                clearable
                defaultDropdownOpened={false}
                nothingFoundMessage=""
                allowDeselect={false}
                maxDropdownHeight={200}
            />

            <Select
                value={selectedSubtype}
                data={subtypeOptions}
                checkIconPosition="left"
                onChange={handleSelectSubtypeChange}
                label="Subtipos de examenes"
                pb={rem(16)}
                placeholder="Escoge un subtipo de examen"
                searchable
                clearable
                defaultDropdownOpened={false}
                nothingFoundMessage=""
                allowDeselect={false}
                maxDropdownHeight={200}
            />

            <Select
                value={selectedExam}
                data={examOptions}
                checkIconPosition="left"
                onChange={handleSelectExamChange}
                label="Examenes"
                pb={rem(16)}
                placeholder="Escoge un examen"
                searchable
                clearable
                defaultDropdownOpened={false}
                nothingFoundMessage=""
                allowDeselect={false}
                maxDropdownHeight={200}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>

        </Box>
    )
});

MedicalResultExamSelectionForm.displayName = 'MedicalResultExamSelectionForm';

export { MedicalResultExamSelectionForm }