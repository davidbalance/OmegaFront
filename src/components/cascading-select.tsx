'use client'

import { Option } from '@/lib/types/option.type';
import { Select } from '@mantine/core';
import React, { useCallback, useState } from 'react'

type CascadingOption = Option & {
    children?: CascadingOption[];
}
export type CascadingSelectValue = {
    name: string;
    label: string;
    value: string;
}
type CascadingSelectProps = {
    options: CascadingOption[];
    onChange?: (selectedPath: CascadingSelectValue[]) => void;
    maxDepth?: number;
    names?: string[];
    labels?: string[];
    placeholders?: string[];
    nothingFoundMessages?: string[];
    defaultValues?: CascadingSelectValue[] | undefined;
    clean?: boolean;
    searchable?: boolean
}
const CascadingSelect: React.FC<CascadingSelectProps> = ({
    options,
    onChange,
    maxDepth,
    names,
    labels,
    defaultValues = [],
    placeholders,
    nothingFoundMessages,
    searchable
}) => {

    const [values, setValues] = useState<CascadingSelectValue[]>(defaultValues);

    const handleChange = useCallback((level: number, value: CascadingSelectValue | null) => {
        const updatedSelection = [...values.slice(0, level), value].filter(e => e !== null) as CascadingSelectValue[];
        setValues(updatedSelection);
        onChange?.(updatedSelection);
    }, [values, onChange]);

    const renderSelects = useCallback((currentOptions: CascadingOption[], level = 0): React.ReactNode | null => {
        if (!currentOptions || currentOptions.length === 0 || (maxDepth && level >= maxDepth)) return null;
        const name = names?.[level] || `level-${level}`;
        const label = labels?.[level] || `Select Level ${level + 1}`;
        return (
            <>
                <Select
                    key={level}
                    name={name}
                    label={label}
                    data={currentOptions}
                    value={values[level]?.value ?? ''}
                    onChange={(_, value) => handleChange(level, value ? { name, label: value.label, value: value.value } : null)}
                    placeholder={placeholders?.[level]}
                    nothingFoundMessage={nothingFoundMessages?.[level]}
                    searchable={searchable}
                />
                {values[level] &&
                    renderSelects(
                        currentOptions.find((opt) => opt.value === values[level].value)?.children || [],
                        level + 1
                    )}
            </>
        );
    }, [values, maxDepth, names, labels, placeholders, nothingFoundMessages, searchable, handleChange])

    return (
        <>{renderSelects(options)}</>
    )
}

export default CascadingSelect