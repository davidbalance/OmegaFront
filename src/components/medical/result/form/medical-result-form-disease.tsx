'use client'

import { DiseaseGroup } from '@/lib/dtos/disease/group/base.response.dto';
import { MedicalResultDisease } from '@/lib/dtos/medical/result/disease/base.response.dto';
import { SelectorOption } from '@/lib/dtos/selector/response.dto';
import { ComboboxItem, rem, Box, Select, Button, Textarea } from '@mantine/core';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

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

interface MedicalResultFormDiseaseProps {
    options: DiseaseGroup[];
    value?: Omit<MedicalResultDisease, 'id'>;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const MedicalResultFormDisease = React.forwardRef<HTMLFormElement, MedicalResultFormDiseaseProps>(({
    value,
    options,
    onSubmit
}, ref) => {

    const [group, setGroup] = useState<DiseaseGroup | null>(null);
    const [disease, setDisease] = useState<SelectorOption<string> | null>(null);
    const [commentary, setCommentary] = useState<string>("");

    const diseaseGroupsOptions = useMemo(() => options.map(e => ({ value: `${e.id}`, label: e.name })) || [], [options]);
    const diseaseOptions = useMemo(() => group?.diseases.map(e => ({ value: `${e.id}`, label: e.name })) || [], [group]);

    const clearForm = () => {
        setGroup(null);
        setDisease(null);
        setCommentary("");
    }

    useEffect(() => {
        if (value) {
            setCommentary(value.diseaseCommentary);
            const currentGroup = options.find(e => e.id === value.diseaseGroupId) || null;
            setGroup(currentGroup);
            if (currentGroup) {
                const currentDisease = currentGroup.diseases.find(e => e.id === value.diseaseId) || null;
                setDisease(currentDisease ? { key: currentDisease.id.toString(10), label: currentDisease.name } : null);
            }
        } else {
            clearForm();
        }
    }, [value]);

    const handleChangeEventGroup = useCallback((option: ComboboxItem) => {
        setGroup(options.find(e => e.id === Number(option.value)) || null);
        setDisease(null);
    }, [group]);

    const handleChangeEventDisease = (option: ComboboxItem) => setDisease({ key: option.value, label: option.label });

    const handleChangeEventCommentary = (event: ChangeEvent<HTMLTextAreaElement>) => setCommentary(event.target.value);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        clearForm();
        onSubmit?.(event);
    }

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={handleSubmit}
            pos='relative'>
            <Box pos='relative'>
                <CustomSelect
                    name='diseaseGroupId'
                    value={group?.id.toString() || null}
                    data={diseaseGroupsOptions}
                    onChange={handleChangeEventGroup}
                    label="Grupo de morbilidades"
                    placeholder="Escoge un grupo de morbilidades"
                    nothingFoundMessage="Grupo de morbilidades no encontrado..."
                />
                <input type='hidden' name='diseaseGroupName' value={group?.name} />

                <CustomSelect
                    name='diseaseId'
                    value={disease?.key || null}
                    data={diseaseOptions}
                    onChange={handleChangeEventDisease}
                    label="Morbilidades"
                    placeholder="Escoge una morbilidad"
                    nothingFoundMessage="Morbilidad no encontrada..."
                />
                <input type='hidden' name='diseaseName' value={disease?.label} />

                <Textarea
                    name='diseaseCommentary'
                    label="Comentario"
                    value={commentary}
                    placeholder="Comentario de la morbilidad"
                    autosize
                    minRows={2}
                    maxRows={8}
                    onChange={handleChangeEventCommentary}
                    required
                />
            </Box>
            <Button
                type='submit'
                style={{ display: 'none' }} />
        </Box>
    )
});

MedicalResultFormDisease.displayName = 'MedicalResultFormDisease';

export { MedicalResultFormDisease }