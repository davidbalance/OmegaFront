'use client'

import { MedicalResultDiseaseYear } from '@/lib/dtos/medical/result/disease/base.response.dto'
import { Select } from '@mantine/core';
import React, { useMemo } from 'react'

interface DiseaseYearSelectProps {
    options: MedicalResultDiseaseYear[];
}
const DiseaseYearSelect: React.FC<DiseaseYearSelectProps> = ({
    options
}) => {

    const dataOptions = useMemo(() => options.map(e => ({ label: e.year.toString(), value: e.year.toString() })), [options]);

    return (
        <Select
            name='year'
            data={dataOptions}
            checkIconPosition="left"
            label="Año"
            placeholder="Escoge un año"
            searchable
            clearable
            defaultDropdownOpened={false}
            nothingFoundMessage="Año no encontrado..."
            maxDropdownHeight={200}
        />
    )
}

export default DiseaseYearSelect